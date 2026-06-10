import { prisma } from './db';
import { politeFetch } from '../connectors/base';
import { ingestArtist, slugify } from './ingest';

const MB = 'https://musicbrainz.org/ws/2';

// House-family tags to search MusicBrainz for — every result is a real, tagged
// artist. Genre is taken from the matching tag; country/city/gender come from
// MusicBrainz so the directory's web (city / style / gender) is populated.
const TAGS = [
  'deep house', 'soulful house', 'afro house', 'tech house', 'garage house', 'disco house',
  'funky house', 'jackin house', 'tribal house', 'latin house', 'organic house', 'melodic house',
  'acid house', 'minimal house', 'progressive house', 'house',
];

const ISO: Record<string, string> = {
  US: 'United States', GB: 'United Kingdom', DE: 'Germany', FR: 'France', IT: 'Italy',
  ES: 'Spain', NL: 'Netherlands', BE: 'Belgium', SE: 'Sweden', DK: 'Denmark', NO: 'Norway',
  ZA: 'South Africa', BR: 'Brazil', AR: 'Argentina', CA: 'Canada', AU: 'Australia',
  IE: 'Ireland', PT: 'Portugal', GR: 'Greece', RO: 'Romania', PL: 'Poland', RU: 'Russia',
  UA: 'Ukraine', IL: 'Israel', AT: 'Austria', CH: 'Switzerland', JP: 'Japan', KR: 'South Korea',
  MX: 'Mexico', CO: 'Colombia', CL: 'Chile', NG: 'Nigeria', AO: 'Angola', TR: 'Turkey',
  CZ: 'Czech Republic', HU: 'Hungary', FI: 'Finland', BG: 'Bulgaria', HR: 'Croatia',
};
const countryName = (c?: string) => (c ? ISO[c] || c : undefined);

export interface DiscoverResult {
  added: number;
  scanned: number;
  total: number;
  done: boolean;
  byTag: Record<string, number>;
}

// Afro-focused tag set (deeper paging since we want a lot of them).
export const AFRO_TAGS = ['afro house', 'afro tech', 'afro deep house', 'soulful house', '3 step', 'afro'];

// Find and add up to `limit` NEW house artists from MusicBrainz. Idempotent
// (skips anyone already in the DB), time-budgeted so it never hard-times-out.
// Pass `tagsOverride` (e.g. AFRO_TAGS) to target a sub-style.
export async function discoverArtists(limit = 250, budgetMs = 45000, tagsOverride?: string[]): Promise<DiscoverResult> {
  const start = Date.now();
  const existing = new Set((await prisma.artist.findMany({ select: { slug: true } })).map((a) => a.slug));
  let added = 0;
  let scanned = 0;
  const byTag: Record<string, number> = {};

  for (const tag of (tagsOverride && tagsOverride.length ? tagsOverride : TAGS)) {
    if (added >= limit || Date.now() - start > budgetMs) break;
    for (const offset of [0, 100, 200, 300, 400]) {
      if (added >= limit || Date.now() - start > budgetMs) break;
      let data: any;
      try {
        const res = await politeFetch(`${MB}/artist?query=${encodeURIComponent(`tag:"${tag}"`)}&limit=100&offset=${offset}&fmt=json`);
        if (!res.ok) continue;
        data = await res.json();
      } catch {
        continue;
      }
      for (const a of data.artists ?? []) {
        if (added >= limit || Date.now() - start > budgetMs) break;
        scanned++;
        const name: string = a.name || '';
        const slug = slugify(name);
        if (!slug || existing.has(slug)) continue;
        if (a.type && a.type !== 'Person' && a.type !== 'Group') continue;
        existing.add(slug);
        try {
          await ingestArtist({
            name,
            country: countryName(a.country),
            city: a['begin-area']?.name || a.area?.name,
            genres: [tag],
            flags: { isFemale: a.gender === 'Female' },
            sourceName: 'MusicBrainz (house-tag discovery)',
            sourceUrl: `https://musicbrainz.org/artist/${a.id}`,
            confidence: 55,
          });
          added++;
          byTag[tag] = (byTag[tag] || 0) + 1;
        } catch {
          /* skip on conflict */
        }
      }
    }
  }

  return { added, scanned, total: await prisma.artist.count(), done: added < limit && Date.now() - start <= budgetMs, byTag };
}
