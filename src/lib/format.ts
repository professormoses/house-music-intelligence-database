import type { ArtistProfile } from './types';
import { abs } from './site';
import { prettyDate } from './site';

// ---------- CSV ----------
export function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  let s = Array.isArray(v) ? v.join('; ') : typeof v === 'object' ? JSON.stringify(v) : String(v);
  if (/[",\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCSV(rows: Record<string, unknown>[], columns?: string[]): string {
  if (!rows.length) return columns ? columns.join(',') + '\n' : '';
  const cols = columns ?? Object.keys(rows[0]);
  const head = cols.join(',');
  const body = rows.map((r) => cols.map((c) => csvCell(r[c])).join(',')).join('\n');
  return head + '\n' + body + '\n';
}

export function toNDJSON(rows: unknown[]): string {
  return rows.map((r) => JSON.stringify(r)).join('\n') + '\n';
}

// ---------- Markdown ----------
function mdTable(headers: string[], rows: (string | number)[][]): string {
  if (!rows.length) return '_None on record._\n';
  const h = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.map((c) => String(c ?? '')).join(' | ')} |`).join('\n');
  return `${h}\n${sep}\n${body}\n`;
}

function linkList(pairs: [string, string | null | undefined][]): string {
  const live = pairs.filter(([, url]) => !!url);
  if (!live.length) return '_None on record._\n';
  return live.map(([label, url]) => `- **${label}:** ${url}`).join('\n') + '\n';
}

export function artistToMarkdown(p: ArtistProfile): string {
  const canonical = abs(`/artist/${p.slug}`);
  const lines: string[] = [];

  lines.push(`# ${p.artist_name}`);
  lines.push('');
  if (p.bio_short) lines.push(`> ${p.bio_short}`);
  lines.push('');
  lines.push(`- **Canonical URL:** ${canonical}`);
  lines.push(`- **JSON:** ${abs(`/api/artists/${p.slug}.json`)}`);
  lines.push(`- **Origin:** ${[p.origin_city, p.origin_country].filter(Boolean).join(', ') || 'unknown'}`);
  if (p.current_city || p.current_country)
    lines.push(`- **Based in:** ${[p.current_city, p.current_country].filter(Boolean).join(', ')}`);
  if (p.real_name) lines.push(`- **Real name:** ${p.real_name}`);
  if (p.aliases?.length) lines.push(`- **Aliases:** ${p.aliases.join(', ')}`);
  if (p.years_active) lines.push(`- **Years active:** ${p.years_active}`);
  lines.push(`- **Primary scene:** ${p.primary_scene || 'unknown'}`);
  lines.push(`- **Genres:** ${p.genres.join(', ') || 'unknown'}`);
  if (p.specific_house_subgenres?.length)
    lines.push(`- **House subgenres:** ${p.specific_house_subgenres.join(', ')}`);
  lines.push(`- **Confidence score:** ${p.confidence_score}/100`);
  lines.push(`- **Last verified:** ${prettyDate(p.last_verified_date)}`);
  lines.push('');

  if (p.bio_long) {
    lines.push('## Biography');
    lines.push('');
    lines.push(p.bio_long);
    lines.push('');
  }

  if (p.black_house_music_relevance || p.cultural_lineage) {
    lines.push('## Cultural lineage');
    lines.push('');
    if (p.black_house_music_relevance) lines.push(p.black_house_music_relevance);
    if (p.cultural_lineage) lines.push('', p.cultural_lineage);
    lines.push('');
  }

  lines.push('## Official & social links');
  lines.push('');
  lines.push(
    linkList([
      ['Website', p.website],
      ['Instagram', p.instagram],
      ['TikTok', p.tiktok],
      ['Spotify', p.spotify],
      ['Apple Music', p.apple_music],
      ['YouTube', p.youtube],
      ['SoundCloud', p.soundcloud],
      ['Bandcamp', p.bandcamp],
      ['Beatport', p.beatport],
      ['Traxsource', p.traxsource],
      ['Discogs', p.discogs],
      ['MusicBrainz', p.musicbrainz],
      ['Resident Advisor', p.resident_advisor],
      ['Songkick', p.songkick],
      ['Bandsintown', p.bandsintown],
      ['Wikipedia', p.wikipedia],
      ['Wikidata', p.wikidata],
      ['Linktree', p.linktree],
    ]),
  );

  lines.push('## Booking & management');
  lines.push('');
  lines.push(
    linkList([
      ['Booking agency', p.booking_agency],
      ['Booking email', p.booking_email],
      ['Management', p.management_company],
      ['Manager', p.manager_name],
      ['Manager email', p.manager_email],
      ['Press email', p.press_email],
      ['General contact', p.general_contact_email],
    ]),
  );

  lines.push('## Metrics');
  lines.push('');
  lines.push(
    mdTable(
      ['Platform', 'Audience'],
      [
        ['Spotify monthly listeners', p.monthly_listeners ?? '—'],
        ['Spotify followers', p.spotify_followers ?? '—'],
        ['Instagram followers', p.instagram_followers ?? '—'],
        ['YouTube subscribers', p.youtube_subscribers ?? '—'],
        ['SoundCloud followers', p.soundcloud_followers ?? '—'],
      ].filter((r) => r[1] !== '—'),
    ),
  );

  if (p.top_releases?.length) {
    lines.push('## Top releases');
    lines.push('');
    lines.push(
      mdTable(
        ['Title', 'Label', 'Year', 'Type'],
        p.top_releases.map((r) => [r.title, r.label ?? '', (r.release_date ?? '').slice(0, 4), r.type ?? '']),
      ),
    );
  }

  if (p.upcoming_shows?.length) {
    lines.push('## Upcoming shows');
    lines.push('');
    lines.push(
      mdTable(
        ['Date', 'Event', 'Venue', 'City'],
        p.upcoming_shows.map((s) => [s.date ?? '', s.event ?? '', s.venue ?? '', s.city ?? '']),
      ),
    );
  }

  if (p.labels_affiliated?.length || p.collaborators?.length) {
    lines.push('## Associations');
    lines.push('');
    if (p.labels_affiliated?.length) lines.push(`- **Labels:** ${p.labels_affiliated.join(', ')}`);
    if (p.collaborators?.length) lines.push(`- **Collaborators / related artists:** ${p.collaborators.join(', ')}`);
    lines.push('');
  }

  lines.push('## Scores');
  lines.push('');
  lines.push(
    mdTable(
      ['Score', 'Value'],
      Object.entries(p.scores).map(([k, v]) => [k.replace(/_/g, ' '), `${v}/100`]),
    ),
  );

  lines.push('## Sources');
  lines.push('');
  if (p.source_urls?.length) {
    lines.push(p.source_urls.map((u, i) => `${i + 1}. ${u}`).join('\n'));
  } else {
    lines.push('_No sources on record._');
  }
  lines.push('');

  if (p.field_sources && Object.keys(p.field_sources).length) {
    lines.push('### Field-level provenance');
    lines.push('');
    lines.push(
      mdTable(
        ['Field', 'Value', 'Source', 'Verified', 'Confidence'],
        Object.entries(p.field_sources).map(([field, fs]) => [
          field,
          String(fs.value ?? ''),
          fs.source_url ? `[${fs.source_name ?? 'source'}](${fs.source_url})` : fs.source_name ?? '',
          prettyDate(fs.last_verified_date),
          `${fs.confidence_score ?? ''}`,
        ]),
      ),
    );
  }

  lines.push('## How to cite this page');
  lines.push('');
  lines.push('```');
  lines.push(p.suggested_citation ?? '');
  lines.push('```');
  lines.push('');
  lines.push(`_Machine-readable: [JSON](${abs(`/api/artists/${p.slug}.json`)}) · part of the [${'House Music Intelligence Database'}](${abs('/')}). See [/llms.txt](${abs('/llms.txt')})._`);
  lines.push('');

  return lines.join('\n');
}
