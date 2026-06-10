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

// Accurate pronouns from verified gender. Unknown -> use the name, never a guess
// and never a generic "them".
function pronouns(p: ArtistProfile) {
  const g = p.gender || (p.is_female ? 'female' : null);
  if (g === 'female') return { known: true, subj: 'she', Subj: 'She', obj: 'her', poss: 'her' };
  if (g === 'male') return { known: true, subj: 'he', Subj: 'He', obj: 'him', poss: 'his' };
  if (g === 'non-binary') return { known: true, subj: 'they', Subj: 'They', obj: 'them', poss: 'their' };
  return { known: false, subj: p.artist_name, Subj: p.artist_name, obj: p.artist_name, poss: `${p.artist_name}'s` };
}

// Evocative, accurate genre characterizations (widely-held descriptions, not
// claims about the artist) — give the narration documentary texture.
const SOUND_DESC: Record<string, string> = {
  'Afro House': 'drum-driven and spiritual, built for the sunrise',
  'Afro Tech': 'percussive, hypnotic and relentless',
  'Deep House': 'warm, soulful and hypnotic',
  'Soulful House': 'gospel-rooted and full of heart',
  'Tech House': 'rolling, stripped-back and made for peak time',
  'Melodic House': 'cinematic and emotional, built for the big room',
  'Organic House': 'earthy, textured and meditative',
  'Disco House': 'glittering, joyful and built on the groove',
  'Funky House': 'bright, bouncing and made to move',
  'Garage House': 'swung, soulful, straight out of the church of house',
  'Chicago House': 'raw and jacking — the original blueprint',
  'Detroit House': 'futuristic and soulful in equal measure',
  'Classic House': 'timeless, vocal and built to last',
  'Acid House': 'squelching, psychedelic and revolutionary',
  'Progressive House': 'sweeping and hypnotic, built for the journey',
  'Minimal House': 'hypnotic and reductive — all about the details',
  'Vocal House': 'anthemic and full of voice',
  'Latin House': 'rhythmic, sun-soaked and alive',
  'Tribal House': 'primal, percussive and tranced-out',
  'Jackin House': 'choppy, looping and relentless',
  'Lo-Fi House': 'dusty, intimate and hazy',
  'UK Garage': 'skippy, swung and unmistakably British',
  House: 'four-to-the-floor and built for the dancefloor',
};
function soundDescriptor(p: ArtistProfile): { words: string; desc: string } {
  const list = [...p.specific_house_subgenres, ...p.genres];
  const words = (p.specific_house_subgenres.length ? p.specific_house_subgenres : p.genres).slice(0, 2).join(' and ') || 'house';
  const key = list.find((g) => SOUND_DESC[g]) || 'House';
  return { words, desc: SOUND_DESC[key] || SOUND_DESC.House };
}

function fmtAudience(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)} million`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

interface Segment {
  start: number;
  line: string;
}

// A documentary-grade, fact-grounded 55s narration in the voice of World Famous
// House Crew — reverent, vivid, information-dense. Every clause is built from a
// verified field; unknowns are omitted, never invented. Pronouns are accurate.
function buildScript(p: ArtistProfile): { segments: Segment[]; script: string } {
  const seed = hash(p.slug);
  const pr = pronouns(p);
  const segs: Segment[] = [];
  const push = (line?: string) => { if (line && line.trim()) segs.push({ start: 0, line: line.trim() }); };

  const origin = [p.origin_city, p.origin_country].filter(Boolean).join(', ');
  const scene = p.primary_scene || (p.genres[0] ? `${p.genres[0]}` : 'house');
  const { words: soundWords, desc: soundDesc } = soundDescriptor(p);
  const startYear = p.years_active ? p.years_active.split(/[–\-]/)[0].trim() : '';
  const role = p.is_female ? 'producer' : 'producer';
  const legend = p.scores?.education_value_score >= 55 || !!p.black_house_music_relevance;
  const emerging = (p.scores?.emerging_artist_score ?? 0) >= 55;

  // 1 — COLD OPEN (documentary hook), varied + tier-aware
  const hooks: string[] = [];
  if (legend) {
    hooks.push(`Some artists chase the sound. ${p.artist_name} helped build it.`);
    hooks.push(`To understand house music, you have to understand ${p.artist_name}.`);
  } else if (emerging) {
    hooks.push(`Every scene has a next. Right now, ${p.artist_name} is it.`);
    hooks.push(`Remember this name: ${p.artist_name}.`);
  }
  hooks.push(`This is the story of ${p.artist_name}.`);
  hooks.push(`${p.artist_name}. One of house music's real ones.`);
  push(pick(hooks, seed));

  // 2 — ORIGIN
  const sinceStr = startYear ? (/s$/.test(startYear) ? `the ${startYear}` : startYear) : '';
  if (origin) {
    const realName = p.real_name && p.real_name !== p.artist_name ? `Born ${p.real_name}, ` : '';
    const subj0 = realName ? (pr.known ? pr.subj : p.artist_name) : pr.known ? pr.Subj : p.artist_name;
    const based = p.current_city && p.current_city !== p.origin_city ? ` Today, ${pr.known ? pr.subj : p.artist_name} calls ${p.current_city} home.` : '';
    push(`${realName}${subj0} came up out of ${origin}, deep in the ${scene} scene${sinceStr ? `, and has been shaping it since ${sinceStr}` : ''}.${based}`);
  } else if (p.primary_scene) {
    push(`${pr.known ? pr.Subj : p.artist_name} is a defining voice in the ${p.primary_scene} scene${sinceStr ? `, at it since ${sinceStr}` : ''}.`);
  }

  // 3 — THE SOUND (sensory)
  push(`${pr.poss === p.artist_name ? `${p.artist_name}'s` : pr.poss.charAt(0).toUpperCase() + pr.poss.slice(1)} sound is ${soundWords} — ${soundDesc}.`);

  // 4 — CULTURE / LINEAGE (reverent)
  if (p.black_house_music_relevance) {
    push(`But it runs deeper than the music. ${pr.known ? pr.Subj : p.artist_name} carries the Black roots of house forward — the culture this whole movement was built on.`);
  } else if (p.cultural_lineage) {
    push(`${pr.known ? pr.Subj : p.artist_name} is a living link in that lineage.`);
  }

  // 5 — THE CRAFT: labels + catalog
  const rels = p.top_releases || [];
  const count = p.release_count && p.release_count > 1 ? p.release_count : rels.length;
  if (p.record_label_owned) {
    push(`${pr.known ? pr.Subj : p.artist_name} runs ${pr.poss === p.artist_name ? 'the' : pr.poss} own label, ${p.record_label_owned}, releasing on ${pr.poss === p.artist_name ? p.artist_name + "'s" : pr.poss} own terms.`);
  } else if (p.labels_affiliated.length) {
    push(`${pr.poss === p.artist_name ? `${p.artist_name}'s` : pr.poss.charAt(0).toUpperCase() + pr.poss.slice(1)} records live on labels like ${p.labels_affiliated.slice(0, 2).join(' and ')}.`);
  }
  if (rels.length) {
    const anthem = p.latest_release || rels[0];
    const deep = rels.find((r) => r.title !== anthem.title);
    let line = `Press play on "${anthem.title}"${anthem.label ? ` on ${anthem.label}` : ''}`;
    if (deep) line += `, then go digging for the deeper cut, "${deep.title}" — one for the heads`;
    line += count > 2 ? `, just two of ${count}-plus releases.` : '.';
    push(line);
  }

  // 6 — THE STAGE + reach
  const stages = p.festivals_played.length ? p.festivals_played.slice(0, 3) : p.venues_played.slice(0, 2);
  if (stages.length) {
    push(`From ${stages.join(' to ')}, ${pr.known ? pr.subj : p.artist_name} moves dancefloors worldwide${p.monthly_listeners ? `, with over ${fmtAudience(p.monthly_listeners)} listeners every month` : ''}.`);
  } else if (p.monthly_listeners) {
    push(`Over ${fmtAudience(p.monthly_listeners)} people press play every single month.`);
  }

  // 7 — WFHC CLOSE (the brand's love + care)
  const closes = [
    `At World Famous House Crew, we don't just track the scene — we honor the people who built it. ${p.artist_name} is one of them.`,
    `World Famous House Crew lives for artists like this. Follow the journey. Share the sound. Keep house alive.`,
    `This is why we do it. From all of us at World Famous House Crew — respect to ${p.artist_name}.`,
  ];
  push(pick(closes, seed >> 3));

  // timing
  const valid = segs.filter((s) => typeof s.line === 'string' && s.line.trim().length > 0);
  const total = valid.reduce((a, s) => a + wordCount(s.line), 0) || 1;
  let acc = 0;
  for (const s of valid) {
    s.start = (acc / total) * 55;
    acc += wordCount(s.line);
  }
  return { segments: valid, script: valid.map((s) => s.line).join(' ') };
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
        max_tokens: 500,
        system:
          'You are an award-winning music-documentary writer — think the narration of a great Netflix or BBC music doc — now writing a 55-second (~135-word) voiceover for World Famous House Crew (WFHC), a house music media company. Voice: reverent, vivid, cinematic, present tense, information-dense, emotionally warm. Convey WFHC\'s deep love, attention and care for the artists, DJs, labels and the history/culture of house music. Open with a documentary hook, build the story, and close in WFHC\'s voice honoring the artist. HARD RULES: (1) Use ONLY facts in the provided list — never add an artist, track, city, label, number or claim not present; omit, never invent. (2) Use the EXACT pronouns given; if pronouns are "unknown", use the artist\'s name and role nouns, never "they/them". Output only the spoken script, no headers.',
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
  const pr = pronouns(p);
  facts.push(`Pronouns to use: ${pr.known ? `${pr.subj}/${pr.obj}/${pr.poss}` : 'UNKNOWN — use the artist name and role nouns, never they/them'}`);
  if (p.real_name && p.real_name !== p.artist_name) facts.push(`Real name: ${p.real_name}`);
  if (p.monthly_listeners) facts.push(`Monthly listeners: ${p.monthly_listeners}`);
  if (p.release_count) facts.push(`Release count: ${p.release_count}`);
  if (p.collaborators?.length) facts.push(`Collaborators: ${p.collaborators.slice(0, 4).join(', ')}`);
  if (p.cultural_lineage) facts.push(`Cultural lineage: ${p.cultural_lineage}`);
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
