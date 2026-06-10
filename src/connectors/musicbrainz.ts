import { politeFetch, type Connector, type Enrichment } from './base';

// MusicBrainz — fully working connector (no API key; requires a descriptive
// User-Agent with contact, per their policy). Rate limit: ~1 req/sec.
const BASE = 'https://musicbrainz.org/ws/2';

const LINK_MAP: Record<string, string> = {
  'official homepage': 'website',
  'discogs': 'discogs',
  'soundcloud': 'soundcloud',
  'bandcamp': 'bandcamp',
  'wikidata': 'wikidata',
  'youtube': 'youtube',
  'streaming': 'spotify',
  'social network': 'instagram',
};

export const musicbrainz: Connector = {
  name: 'MusicBrainz',
  isConfigured: () => true,
  compliant: () => true,

  async enrich({ name }): Promise<Enrichment | null> {
    const q = encodeURIComponent(`artist:"${name}"`);
    const searchRes = await politeFetch(`${BASE}/artist?query=${q}&fmt=json&limit=1`);
    if (!searchRes.ok) return null;
    const search = (await searchRes.json()) as any;
    const hit = search.artists?.[0];
    if (!hit) return null;

    const mbid = hit.id;
    const detailRes = await politeFetch(`${BASE}/artist/${mbid}?inc=url-rels+tags&fmt=json`);
    const detail = detailRes.ok ? ((await detailRes.json()) as any) : hit;
    const sourceUrl = `https://musicbrainz.org/artist/${mbid}`;
    const score = Math.min(95, Math.round((hit.score ?? 70)));

    const fields = [];
    if (detail.country)
      fields.push({ field: 'origin_country', value: detail.country, sourceName: 'MusicBrainz', sourceUrl, confidence: score, method: 'api' as const });
    // Only treat area as a city when it isn't the country itself (MB "area"
    // is sometimes country-level, which would duplicate origin_country).
    if (detail.area?.name && detail.area.name !== detail.country && detail.begin_area?.name !== detail.country)
      fields.push({ field: 'origin_city', value: detail.begin_area?.name || detail.area.name, sourceName: 'MusicBrainz', sourceUrl, confidence: Math.max(40, score - 20), method: 'api' as const });
    const tags = (detail.tags ?? []).sort((a: any, b: any) => (b.count ?? 0) - (a.count ?? 0)).map((t: any) => t.name);
    if (tags.length)
      fields.push({ field: 'genres', value: tags.slice(0, 6).join(', '), sourceName: 'MusicBrainz', sourceUrl, confidence: Math.max(40, score - 15), method: 'api' as const });
    fields.push({ field: 'musicbrainz', value: sourceUrl, sourceName: 'MusicBrainz', sourceUrl, confidence: 99, method: 'api' as const });

    const links: Record<string, string> = { musicbrainz: sourceUrl };
    for (const rel of detail.relations ?? []) {
      const key = LINK_MAP[rel.type];
      const target = rel.url?.resource;
      if (key && target && !links[key]) links[key] = target;
    }

    return { name: detail.name ?? name, fields, links };
  },
};
