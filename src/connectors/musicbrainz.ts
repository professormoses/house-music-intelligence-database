import { politeFetch, type Connector, type Enrichment } from './base';

// MusicBrainz — fully working connector (no API key; requires a descriptive
// User-Agent with contact, per their policy). Rate limit: ~1 req/sec.
const BASE = 'https://musicbrainz.org/ws/2';

// Map a relation to a profile field by the URL HOST (reliable), not by
// MusicBrainz's relation type (which lumps Instagram/Twitter/Facebook under
// "social network" and Spotify under "free streaming", etc.).
function linkKeyForUrl(url: string, relType: string): string | null {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('open.spotify.com')) return 'spotify';
  if (u.includes('music.apple.com')) return 'apple_music';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('soundcloud.com')) return 'soundcloud';
  if (u.includes('bandcamp.com')) return 'bandcamp';
  if (u.includes('beatport.com')) return 'beatport';
  if (u.includes('traxsource.com')) return 'traxsource';
  if (u.includes('discogs.com')) return 'discogs';
  if (u.includes('ra.co') || u.includes('residentadvisor')) return 'resident_advisor';
  if (u.includes('wikidata.org')) return 'wikidata';
  if (relType === 'official homepage' || relType === 'official site') return 'website';
  return null;
}

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

    // Extract official/social/streaming links by URL host, and record each as a
    // sourced field so it shows up with provenance.
    const links: Record<string, string> = { musicbrainz: sourceUrl };
    for (const rel of detail.relations ?? []) {
      const target = rel.url?.resource;
      if (!target) continue;
      const key = linkKeyForUrl(target, rel.type);
      if (key && !links[key]) {
        links[key] = target;
        fields.push({ field: key, value: target, sourceName: 'MusicBrainz', sourceUrl, confidence: 88, method: 'api' as const });
      }
    }

    return { name: detail.name ?? name, fields, links };
  },
};
