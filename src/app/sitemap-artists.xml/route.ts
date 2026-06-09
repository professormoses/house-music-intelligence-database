import { prisma } from '@/lib/db';
import { abs } from '@/lib/site';
import { urlset, XML_HEADERS } from '@/lib/xml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const artists = await prisma.artist.findMany({ select: { slug: true, updatedAt: true } });
  const entries = artists.flatMap((a) => {
    const lastmod = a.updatedAt.toISOString().slice(0, 10);
    return [
      { loc: abs(`/artist/${a.slug}`), lastmod },
      { loc: abs(`/artist/${a.slug}.md`), lastmod },
      { loc: abs(`/api/artists/${a.slug}.json`), lastmod },
    ];
  });
  return new Response(urlset(entries), { headers: XML_HEADERS });
}
