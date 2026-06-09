import { prisma } from '@/lib/db';
import { SITE, abs } from '@/lib/site';
import { rss, XML_HEADERS } from '@/lib/xml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const changes = await prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  const body = rss({
    title: `${SITE.name} — Updates`,
    link: SITE.url,
    description: 'Recent changes to the House Music Intelligence Database.',
    items: changes.map((c) => ({
      title: `${c.changeType} · ${c.entityType}${c.entitySlug ? ` · ${c.entitySlug}` : ''}`,
      link: c.entitySlug ? abs(`/artist/${c.entitySlug}`) : abs('/changelog.md'),
      description: c.newValue ?? c.fieldName ?? '',
      pubDate: c.createdAt.toISOString(),
      guid: c.id,
    })),
  });
  return new Response(body, { headers: XML_HEADERS });
}
