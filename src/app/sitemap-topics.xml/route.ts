import { prisma } from '@/lib/db';
import { abs, today } from '@/lib/site';
import { urlset, XML_HEADERS } from '@/lib/xml';
import { DOC_PATHS } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  const topics = await prisma.topic.findMany({ select: { slug: true, updatedAt: true } });
  const entries = [
    ...topics.flatMap((t) => {
      const lastmod = t.updatedAt.toISOString().slice(0, 10);
      return [
        { loc: abs(`/topic/${t.slug}`), lastmod },
        { loc: abs(`/topic/${t.slug}.md`), lastmod },
        { loc: abs(`/api/topics/${t.slug}.json`), lastmod },
      ];
    }),
    ...['/knowledge', '/about', '/methodology', '/cite'].map((p) => ({ loc: abs(p), lastmod: today() })),
    ...DOC_PATHS.map((p) => ({ loc: abs(p), lastmod: today() })),
  ];
  return new Response(urlset(entries), { headers: XML_HEADERS });
}
