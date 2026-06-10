import { politeFetch, type Connector, type Enrichment, type EnrichmentField } from './base';

// Wikidata — free, no API key, explicitly OK for automated use. Excellent for
// official links + social handles via structured properties.
const PROPS: Record<string, { field: string; url: (v: string) => string }> = {
  P856: { field: 'website', url: (v) => v },
  P2003: { field: 'instagram', url: (v) => `https://www.instagram.com/${v}/` },
  P2397: { field: 'youtube', url: (v) => `https://www.youtube.com/channel/${v}` },
  P1902: { field: 'spotify', url: (v) => `https://open.spotify.com/artist/${v}` },
  P3040: { field: 'soundcloud', url: (v) => `https://soundcloud.com/${v}` },
  P7085: { field: 'tiktok', url: (v) => `https://www.tiktok.com/@${v}` },
  P1953: { field: 'discogs', url: (v) => `https://www.discogs.com/artist/${v}` },
  P434: { field: 'musicbrainz', url: (v) => `https://musicbrainz.org/artist/${v}` },
  P4456: { field: 'beatport', url: (v) => `https://www.beatport.com/artist/x/${v}` },
};

export const wikidata: Connector = {
  name: 'Wikidata',
  isConfigured: () => true,
  compliant: () => true,

  async enrich({ name }): Promise<Enrichment | null> {
    // 1) find the entity, preferring a music-related description
    const searchRes = await politeFetch(
      `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&type=item&limit=6&format=json&origin=*`,
    );
    if (!searchRes.ok) return null;
    const search = (await searchRes.json()) as any;
    const hits: any[] = search.search ?? [];
    if (!hits.length) return null;
    const musicy = hits.find((h) => /dj|disc jockey|producer|musician|composer|record producer|singer/i.test(h.description || ''));
    const id = (musicy || hits[0]).id;

    // 2) fetch claims
    const entRes = await politeFetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`);
    if (!entRes.ok) return null;
    const ent = (await entRes.json()) as any;
    const claims = ent.entities?.[id]?.claims ?? {};
    const sourceUrl = `https://www.wikidata.org/wiki/${id}`;

    const fields: EnrichmentField[] = [
      { field: 'wikidata', value: sourceUrl, sourceName: 'Wikidata', sourceUrl, confidence: 95, method: 'api' },
    ];
    const links: Record<string, string> = { wikidata: sourceUrl };

    // Gender (P21). Trans women -> female (she/her), trans men -> male, true
    // non-binary -> they; anything else is left unknown (writer uses the name).
    const gid = claims.P21?.[0]?.mainsnak?.datavalue?.value?.id;
    const GMAP: Record<string, string> = {
      Q6581097: 'male', Q2449503: 'male', // male, trans man
      Q6581072: 'female', Q1052281: 'female', // female, trans woman
      Q48270: 'non-binary', Q1097630: 'non-binary', // non-binary, genderqueer
    };
    if (gid && GMAP[gid]) {
      fields.push({ field: 'gender', value: GMAP[gid], sourceName: 'Wikidata', sourceUrl, confidence: 94, method: 'api' });
    }

    for (const [prop, cfg] of Object.entries(PROPS)) {
      const v = claims[prop]?.[0]?.mainsnak?.datavalue?.value;
      if (typeof v === 'string' && v) {
        const url = cfg.url(v);
        if (!links[cfg.field]) {
          links[cfg.field] = url;
          fields.push({ field: cfg.field, value: url, sourceName: 'Wikidata', sourceUrl, confidence: 90, method: 'api' });
        }
      }
    }

    return { name, fields, links };
  },
};
