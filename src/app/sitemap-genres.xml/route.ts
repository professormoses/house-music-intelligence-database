import { abs, today } from '@/lib/site';
import { HOUSE_GENRES, genreSlug } from '@/lib/genres';
import { urlset, XML_HEADERS } from '@/lib/xml';
import { DOC_PATHS } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  const entries = [
    ...DOC_PATHS.map((p) => ({ loc: abs(p), lastmod: today() })),
    ...HOUSE_GENRES.map((g) => ({
      loc: abs(`/api/artists?genre=${encodeURIComponent(g)}`),
      lastmod: today(),
    })),
    ...HOUSE_GENRES.map((g) => ({ loc: abs(`/#genre=${genreSlug(g)}`), lastmod: today() })),
  ];
  return new Response(urlset(entries), { headers: XML_HEADERS });
}
