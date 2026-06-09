import { politeFetch, type Connector, type Enrichment } from './base';

// Discogs — official API. Set DISCOGS_TOKEN in .env to enable.
const BASE = 'https://api.discogs.com';

export const discogs: Connector = {
  name: 'Discogs',
  isConfigured: () => !!process.env.DISCOGS_TOKEN,
  compliant: () => true, // official API usage

  async enrich({ name }): Promise<Enrichment | null> {
    const token = process.env.DISCOGS_TOKEN;
    if (!token) return null;
    const res = await politeFetch(
      `${BASE}/database/search?type=artist&q=${encodeURIComponent(name)}&token=${token}&per_page=1`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    const hit = data.results?.[0];
    if (!hit) return null;

    const sourceUrl = `https://www.discogs.com/artist/${hit.id}`;
    const fields = [
      { field: 'discogs', value: sourceUrl, sourceName: 'Discogs', sourceUrl, confidence: 90, method: 'api' as const },
    ];

    // Pull a few notable releases for this artist.
    const releases: Enrichment['releases'] = [];
    try {
      const rel = await politeFetch(`${BASE}/artists/${hit.id}/releases?sort=year&sort_order=desc&per_page=10&token=${token}`);
      if (rel.ok) {
        const rd = (await rel.json()) as any;
        for (const r of rd.releases ?? []) {
          if (r.role && r.role !== 'Main') continue;
          releases.push({ title: r.title, label: r.label, release_date: r.year ? String(r.year) : undefined, type: r.type, url: `https://www.discogs.com/release/${r.id}` });
        }
      }
    } catch {
      /* non-fatal */
    }

    return { name, fields, links: { discogs: sourceUrl }, releases };
  },
};
