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

// Southern California areas → local-scene region. Drives the weekly LA discovery
// that searches MusicBrainz for newly-added house artists from these cities.
const SOCAL_AREAS: { city: string; region: string }[] = [
  { city: 'Los Angeles', region: 'Greater LA' },
  { city: 'Long Beach', region: 'Greater LA' },
  { city: 'Pasadena', region: 'Greater LA' },
  { city: 'Santa Monica', region: 'Greater LA' },
  { city: 'Hollywood', region: 'Greater LA' },
  { city: 'Inglewood', region: 'Greater LA' },
  { city: 'Burbank', region: 'Greater LA' },
  { city: 'San Diego', region: 'San Diego' },
  { city: 'Oceanside', region: 'San Diego' },
  { city: 'Riverside', region: 'Inland Empire' },
  { city: 'San Bernardino', region: 'Inland Empire' },
  { city: 'Pomona', region: 'Inland Empire' },
  { city: 'Palm Springs', region: 'Inland Empire' },
  { city: 'Palm Desert', region: 'Inland Empire' },
];

export interface LADiscoverResult {
  added: number;
  scanned: number;
  total: number;
  byRegion: Record<string, number>;
  done: boolean;
}

// Weekly LA intelligence: search MusicBrainz for house-tagged artists from each
// SoCal city and add any NEW ones, tagged with their region. Compliant (one
// public API), idempotent (skips existing), time-budgeted. Underground LA DJs not
// in MusicBrainz are covered by the curated roster / research instead.
export async function discoverLAArtists(limit = 120, budgetMs = 60000): Promise<LADiscoverResult> {
  const start = Date.now();
  const existing = new Set((await prisma.artist.findMany({ select: { slug: true } })).map((a) => a.slug));
  let added = 0;
  let scanned = 0;
  const byRegion: Record<string, number> = {};
  const houseTags = ['house', 'deep house', 'tech house', 'soulful house', 'afro house', 'disco house', 'latin house'];

  for (const { city, region } of SOCAL_AREAS) {
    if (added >= limit || Date.now() - start > budgetMs) break;
    for (const tag of houseTags) {
      if (added >= limit || Date.now() - start > budgetMs) break;
      let data: any;
      try {
        const q = `area:"${city}" AND tag:"${tag}"`;
        const res = await politeFetch(`${MB}/artist?query=${encodeURIComponent(q)}&limit=50&fmt=json`);
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
        // Confirm the artist's area actually matches (the MB query can be fuzzy).
        const areaName = (a.area?.name || a['begin-area']?.name || '').toLowerCase();
        if (areaName && !areaName.includes(city.toLowerCase()) && city.toLowerCase() !== 'hollywood') continue;
        existing.add(slug);
        try {
          await ingestArtist({
            name,
            country: 'United States',
            city: a['begin-area']?.name || a.area?.name || city,
            currentCity: city,
            currentCountry: 'United States',
            region,
            scene: 'House',
            genres: [tag],
            flags: { isFemale: a.gender === 'Female' },
            sourceName: 'MusicBrainz (LA-area house discovery)',
            sourceUrl: `https://musicbrainz.org/artist/${a.id}`,
            confidence: 50,
          });
          added++;
          byRegion[region] = (byRegion[region] || 0) + 1;
        } catch {
          /* skip */
        }
      }
    }
  }

  return { added, scanned, total: await prisma.artist.count(), byRegion, done: Date.now() - start <= budgetMs };
}

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
