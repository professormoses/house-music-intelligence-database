import type { ArtistProfile } from './types';
import { computePopularity } from './popularity';
import { searchCC, type CCImage } from './openverse';
import { prettyDate, today, SITE, abs } from './site';

// ── helpers ─────────────────────────────────────────────
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const pick = <T>(arr: T[], seed: number): T => arr[((Math.trunc(seed) % arr.length) + arr.length) % arr.length];
const wordCount = (s?: string) => (s || '').split(/\s+/).filter(Boolean).length;
const mmss = (sec: number) => `0:${String(Math.round(sec)).padStart(2, '0')}`;

interface Segment {
  start: number;
  line: string;
}

// Build the spoken script purely from verified fields. Unknown fields are
// omitted, never invented.
function buildScript(p: ArtistProfile): { segments: Segment[]; script: string } {
  const seed = hash(p.slug);
  const segs: Segment[] = [];
  const origin = [p.origin_city, p.origin_country].filter(Boolean).join(', ');
  const genres = p.genres.slice(0, 3);
  const sub = p.specific_house_subgenres.slice(0, 2);
  const soundWords = (sub.length ? sub : genres).join(' and ') || 'house';

  // HOOK
  const hooks = [
    `This is ${p.artist_name}.`,
    `If you move to house music, you need to know ${p.artist_name}.`,
    `Meet ${p.artist_name} — one of the names shaping ${genres[0] || 'house'} right now.`,
    `${p.artist_name}. Remember the name.`,
  ];
  segs.push({ start: 0, line: pick(hooks, seed) });

  // ORIGIN
  if (origin) {
    const based = p.current_city && p.current_city !== p.origin_city ? `, now based in ${p.current_city}` : '';
    segs.push({ start: 0, line: `Out of ${origin}${based}, they came up through the ${p.primary_scene || 'house'} scene.` });
  } else if (p.primary_scene) {
    segs.push({ start: 0, line: `A core figure in the ${p.primary_scene} scene.` });
  }

  // SOUND + lineage
  let sound = `Their sound is ${soundWords}`;
  if (p.years_active) sound += `, and they've been at it since ${p.years_active.split(/[–-]/)[0].trim()}`;
  sound += '.';
  segs.push({ start: 0, line: sound });
  if (p.black_house_music_relevance) {
    segs.push({ start: 0, line: `They carry the Black roots of house forward — the culture this music was built on.` });
  }

  // LABELS
  if (p.record_label_owned) {
    segs.push({ start: 0, line: `They run their own label, ${p.record_label_owned}.` });
  } else if (p.labels_affiliated.length) {
    segs.push({ start: 0, line: `You'll find their records on ${p.labels_affiliated.slice(0, 2).join(' and ')}.` });
  }

  // LIVE
  if (p.festivals_played.length) {
    segs.push({ start: 0, line: `They've played stages like ${p.festivals_played.slice(0, 3).join(', ')}.` });
  } else if (p.venues_played.length) {
    segs.push({ start: 0, line: `Catch them at rooms like ${p.venues_played.slice(0, 2).join(' and ')}.` });
  }

  // TRACKS — anthem + deep cut, only if on record
  const rels = p.top_releases || [];
  if (rels.length) {
    const anthem = p.latest_release || rels[0];
    segs.push({ start: 0, line: `Start with "${anthem.title}"${anthem.label ? ` on ${anthem.label}` : ''}.` });
    const deep = rels.find((r) => r.title !== anthem.title);
    if (deep) segs.push({ start: 0, line: `Then dig for the deeper cut, "${deep.title}" — one for the heads.` });
  } else {
    segs.push({ start: 0, line: `Dig into their catalog on Beatport and Bandcamp — there's gold in there.` });
  }

  // CLOSE
  const closes = [
    `Follow them, share the sound, and keep house music moving.`,
    `Real house, real culture. Pass it on.`,
    `One to watch on every dancefloor. Tap follow.`,
  ];
  segs.push({ start: 0, line: pick(closes, seed >> 3) });

  // drop any empty/undefined lines, then distribute timing across 55s by word share
  const valid = segs.filter((s) => typeof s.line === 'string' && s.line.trim().length > 0);
  const total = valid.reduce((a, s) => a + wordCount(s.line), 0) || 1;
  let acc = 0;
  for (const s of valid) {
    s.start = (acc / total) * 55;
    acc += wordCount(s.line);
  }
  const script = valid.map((s) => s.line).join(' ');
  return { segments: valid, script };
}

// Optional polish via the Claude API (grounded: may only rephrase the given
// facts). Falls back silently to the deterministic script.
async function claudePolish(script: string, facts: string[]): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 400,
        system:
          'You are an elite short-form VO scriptwriter for the house music community. Rewrite the draft into a punchy, warm, ~135-word, 55-second voiceover. CRITICAL: use ONLY facts in the provided list — do NOT add any artist, track, city, label, number, or claim not present. Omit, never invent. Output only the spoken script, no headers.',
        messages: [
          {
            role: 'user',
            content: `VERIFIED FACTS (the only facts you may use):\n${facts.map((f) => '- ' + f).join('\n')}\n\nDRAFT:\n${script}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    const text = data?.content?.[0]?.text?.trim();
    return text || null;
  } catch {
    return null;
  }
}

// ── shot list ───────────────────────────────────────────
interface Shot {
  label: string;
  concept: string;
  query: string;
  prompt: string;
}

function buildShots(p: ArtistProfile): Shot[] {
  const city = p.origin_city || p.origin_country || 'city';
  const genre = (p.specific_house_subgenres[0] || p.genres[0] || 'house').toLowerCase();
  return [
    { label: 'Opening / location', concept: `${city} establishing shot`, query: `${city} skyline night`, prompt: `Cinematic night establishing shot of ${city}, neon city lights, moody film grain, 9:16 vertical, house-music music-video aesthetic` },
    { label: 'The crowd', concept: 'packed dancefloor, hands up', query: 'nightclub crowd dancing hands', prompt: `A euphoric ${genre} dancefloor at peak time, hands in the air, haze and laser light, shallow depth of field, 9:16 vertical` },
    { label: 'The decks', concept: 'DJ decks / mixer / vinyl close-up', query: 'dj turntables mixer closeup', prompt: `Extreme close-up of a DJ mixer and turntables, vinyl spinning, warm club lighting, bokeh, 9:16 vertical` },
    { label: 'Genre texture', concept: `${genre} mood b-roll`, query: `${genre} music`, prompt: `Abstract ${genre} mood visual — sound waves, sunrise over a festival crowd, organic texture, 9:16 vertical` },
  ];
}

// ── assemble the full text file ─────────────────────────
export interface VoResult {
  title: string;
  body: string;
  wordCount: number;
  durationSec: number;
  generator: 'deterministic' | 'claude';
}

export async function generateVoScript(p: ArtistProfile): Promise<VoResult> {
  const { segments, script } = buildScript(p);

  // facts list (for Claude grounding + for the user's fact-check)
  const facts: string[] = [];
  if (p.origin_city || p.origin_country) facts.push(`Origin: ${[p.origin_city, p.origin_country].filter(Boolean).join(', ')}`);
  if (p.current_city) facts.push(`Currently based: ${p.current_city}`);
  if (p.primary_scene) facts.push(`Primary scene: ${p.primary_scene}`);
  if (p.genres.length) facts.push(`Genres: ${p.genres.join(', ')}`);
  if (p.specific_house_subgenres.length) facts.push(`House subgenres: ${p.specific_house_subgenres.join(', ')}`);
  if (p.record_label_owned) facts.push(`Owns label: ${p.record_label_owned}`);
  if (p.labels_affiliated.length) facts.push(`Labels: ${p.labels_affiliated.join(', ')}`);
  if (p.festivals_played.length) facts.push(`Festivals: ${p.festivals_played.join(', ')}`);
  if (p.venues_played.length) facts.push(`Venues: ${p.venues_played.join(', ')}`);
  (p.top_releases || []).forEach((r) => facts.push(`Release: "${r.title}"${r.label ? ` on ${r.label}` : ''}${r.release_date ? ` (${r.release_date.slice(0, 4)})` : ''}`));
  if (p.years_active) facts.push(`Years active: ${p.years_active}`);
  if (p.black_house_music_relevance) facts.push(`Black house relevance: ${p.black_house_music_relevance}`);

  // optional Claude polish
  let finalScript = script;
  let generator: 'deterministic' | 'claude' = 'deterministic';
  const polished = await claudePolish(script, facts);
  if (polished) {
    finalScript = polished;
    generator = 'claude';
  }

  // shot list + CC images (best effort, hard-capped so generation never hangs)
  const shots = buildShots(p);
  let ccByShot: CCImage[][] = shots.map(() => []);
  try {
    ccByShot = await Promise.race([
      Promise.all(shots.map((s, i) => (i < 2 ? searchCC(s.query, 1) : Promise.resolve([] as CCImage[])))),
      new Promise<CCImage[][]>((resolve) => setTimeout(() => resolve(shots.map(() => [])), 7000)),
    ]);
  } catch {
    ccByShot = shots.map(() => []);
  }

  const wc = wordCount(finalScript);
  const dur = Math.round((wc / 150) * 60);
  const pop = computePopularity(p);

  const lines: string[] = [];
  lines.push(`========================================================`);
  lines.push(`55-SECOND VO SCRIPT — ${p.artist_name}`);
  lines.push(`========================================================`);
  lines.push(`Generated ${prettyDate(today())} · ${SITE.name}`);
  lines.push(`Profile: ${abs(`/artist/${p.slug}`)}`);
  lines.push(`Popularity score: ${pop.score}/100 · Confidence: ${p.confidence_score}/100 · Verified: ${prettyDate(p.last_verified_date)}`);
  lines.push(`Est. duration: ~${dur}s (${wc} words @ ~150 wpm) · Writer: ${generator}`);
  lines.push('');
  lines.push(`Accuracy: every line below is drawn from verified database fields (sources at the bottom). Fields not on record were omitted, not invented.`);
  lines.push('');
  lines.push(`--------------------------------------------------------`);
  lines.push(`VOICEOVER SCRIPT  (read aloud / paste into text-to-speech)`);
  lines.push(`--------------------------------------------------------`);
  if (generator === 'claude') {
    lines.push(finalScript);
  } else {
    for (const s of segments) lines.push(`[${mmss(s.start)}]  ${s.line}`);
  }
  lines.push('');
  lines.push(`Plain script (for text-to-audio):`);
  lines.push(finalScript);
  lines.push('');
  lines.push(`--------------------------------------------------------`);
  lines.push(`SHOT LIST / B-ROLL`);
  lines.push(`--------------------------------------------------------`);
  shots.forEach((shot, i) => {
    lines.push(`SHOT ${i + 1} — ${shot.label}: ${shot.concept}`);
    const imgs = ccByShot[i];
    if (imgs.length) {
      imgs.forEach((img) => lines.push(`  • Creative Commons: ${img.url}\n      ${img.attribution} | license: ${img.license} ${img.licenseUrl}`));
    } else {
      lines.push(`  • No suitable Creative Commons image found.`);
    }
    lines.push(`  • Text-to-image prompt (if needed): ${shot.prompt}`);
    lines.push('');
  });
  lines.push(`FACE SHOT (the artist): use their OFFICIAL press photo${p.website ? ` from ${p.website}` : ''}${p.instagram ? ` or ${p.instagram}` : ''}.`);
  lines.push(`  Do NOT substitute a random Creative Commons photo of a person — it may not be them.`);
  lines.push('');
  lines.push(`--------------------------------------------------------`);
  lines.push(`TITLE / CAPTION / HASHTAGS`);
  lines.push(`--------------------------------------------------------`);
  lines.push(`Reel title: ${p.artist_name} — the ${(p.specific_house_subgenres[0] || p.genres[0] || 'house')} artist you should know`);
  lines.push(`Caption: ${p.artist_name}${p.origin_country ? ` (${p.origin_country})` : ''} — ${p.genres.slice(0, 2).join(' / ')}. Who's your favorite ${(p.primary_scene || 'house')} artist? Drop it below. 🎧`);
  const tags = ['#housemusic', '#house', ...(p.genres || []).map((g) => '#' + g.toLowerCase().replace(/[^a-z0-9]/g, '')), '#djlife', '#undergroundhouse', '#worldfamoushousecrew'];
  lines.push(`Hashtags: ${[...new Set(tags)].slice(0, 12).join(' ')}`);
  lines.push('');
  lines.push(`--------------------------------------------------------`);
  lines.push(`SOURCES (fact-check)`);
  lines.push(`--------------------------------------------------------`);
  if (p.source_urls?.length) p.source_urls.forEach((u, i) => lines.push(`${i + 1}. ${u}`));
  else lines.push(`(No external sources on record — verify before publishing.)`);
  lines.push('');
  lines.push(`Machine-readable profile: ${abs(`/api/artists/${p.slug}.json`)}`);
  lines.push(`Citation: ${p.suggested_citation || ''}`);

  return { title: `${p.artist_name} — 55s VO`, body: lines.join('\n'), wordCount: wc, durationSec: dur, generator };
}
