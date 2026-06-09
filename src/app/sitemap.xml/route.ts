import { abs, today } from '@/lib/site';
import { sitemapIndex, XML_HEADERS } from '@/lib/xml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const body = sitemapIndex([
    { loc: abs('/sitemap-artists.xml'), lastmod: today() },
    { loc: abs('/sitemap-labels.xml'), lastmod: today() },
    { loc: abs('/sitemap-genres.xml'), lastmod: today() },
    { loc: abs('/sitemap-topics.xml'), lastmod: today() },
  ]);
  return new Response(body, { headers: XML_HEADERS });
}
