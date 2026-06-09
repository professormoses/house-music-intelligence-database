import { prisma } from '@/lib/db';
import { abs } from '@/lib/site';
import { urlset, XML_HEADERS } from '@/lib/xml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const labels = await prisma.label.findMany({ select: { slug: true, updatedAt: true } });
  const entries = labels.flatMap((l) => {
    const lastmod = l.updatedAt.toISOString().slice(0, 10);
    return [
      { loc: abs(`/label/${l.slug}`), lastmod },
      { loc: abs(`/label/${l.slug}.md`), lastmod },
      { loc: abs(`/api/labels/${l.slug}.json`), lastmod },
    ];
  });
  return new Response(urlset(entries), { headers: XML_HEADERS });
}
