import { politeFetch, type Connector, type Enrichment, type EnrichmentField } from './base';

// Wikipedia — free MediaWiki API, OK for automated use. Pulls the intro bio.
export const wikipedia: Connector = {
  name: 'Wikipedia',
  isConfigured: () => true,
  compliant: () => true,

  async enrich({ name }): Promise<Enrichment | null> {
    const url =
      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(name)}` +
      `&gsrlimit=1&prop=extracts|info&inprop=url&exintro&explaintext&format=json&redirects=1&origin=*`;
    const res = await politeFetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    const pages = data.query?.pages;
    if (!pages) return null;
    const page: any = Object.values(pages)[0];
    if (!page || !page.extract) return null;

    // Light relevance guard: the intro should look like a music bio (and not a
    // disambiguation page).
    const extract: string = page.extract.trim();
    if (/may refer to|disambiguation/i.test(extract) || !/dj|disc jockey|producer|musician|record|house|techno|electronic|singer|composer/i.test(extract)) {
      return { name, fields: [{ field: 'wikipedia', value: page.fullurl, sourceName: 'Wikipedia', sourceUrl: page.fullurl, confidence: 60, method: 'api' }], links: { wikipedia: page.fullurl } };
    }

    const sentences = extract.split(/(?<=[.!?])\s+/);
    const bioShort = sentences.slice(0, 2).join(' ').slice(0, 320);
    const bioLong = extract.slice(0, 1200);
    const sourceUrl: string = page.fullurl;

    const fields: EnrichmentField[] = [
      { field: 'wikipedia', value: sourceUrl, sourceName: 'Wikipedia', sourceUrl, confidence: 85, method: 'api' },
      { field: 'bio_short', value: bioShort, sourceName: 'Wikipedia', sourceUrl, confidence: 80, method: 'api' },
      { field: 'bio_long', value: bioLong, sourceName: 'Wikipedia', sourceUrl, confidence: 80, method: 'api' },
    ];
    return { name, fields, links: { wikipedia: sourceUrl } };
  },
};
