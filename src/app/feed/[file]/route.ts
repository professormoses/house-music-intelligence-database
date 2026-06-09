import { prisma } from '@/lib/db';
import { SITE, abs } from '@/lib/site';
import { rss, XML_HEADERS } from '@/lib/xml';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const kind = params.file.replace(/\.xml$/, '');
  let body: string;

  if (kind === 'artists') {
    const rows = await prisma.artist.findMany({ orderBy: { updatedAt: 'desc' }, take: 100 });
    body = rss({
      title: `${SITE.name} — Artists`,
      link: SITE.url,
      description: 'Artists in the database.',
      items: rows.map((a) => ({ title: a.artistName, link: abs(`/artist/${a.slug}`), pubDate: a.updatedAt.toISOString(), guid: a.id })),
    });
  } else if (kind === 'labels') {
    const rows = await prisma.label.findMany({ orderBy: { updatedAt: 'desc' }, take: 100 });
    body = rss({
      title: `${SITE.name} — Labels`,
      link: SITE.url,
      description: 'Labels in the database.',
      items: rows.map((l) => ({ title: l.labelName, link: abs(`/label/${l.slug}`), pubDate: l.updatedAt.toISOString(), guid: l.id })),
    });
  } else if (kind === 'releases') {
    const rows = await prisma.artistRelease.findMany({ orderBy: { createdAt: 'desc' }, take: 100, include: { artist: true } });
    body = rss({
      title: `${SITE.name} — Releases`,
      link: SITE.url,
      description: 'Releases tracked in the database.',
      items: rows.map((r) => ({ title: `${r.artist.artistName} — ${r.title}`, link: abs(`/artist/${r.artist.slug}`), pubDate: r.createdAt.toISOString(), guid: r.id })),
    });
  } else if (kind === 'events') {
    const rows = await prisma.event.findMany({ orderBy: { date: 'desc' }, take: 100 });
    body = rss({
      title: `${SITE.name} — Events`,
      link: SITE.url,
      description: 'Events tracked in the database.',
      items: rows.map((e) => ({ title: e.eventName, link: e.ticketLink ?? SITE.url, description: `${e.date} · ${e.city}`, pubDate: e.date ?? undefined, guid: e.id })),
    });
  } else if (kind === 'updates') {
    const rows = await prisma.changeLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
    body = rss({
      title: `${SITE.name} — Updates`,
      link: SITE.url,
      description: 'Change log.',
      items: rows.map((c) => ({ title: `${c.changeType} ${c.entityType}`, link: abs('/changelog.md'), pubDate: c.createdAt.toISOString(), guid: c.id })),
    });
  } else {
    return new Response('Unknown feed', { status: 404 });
  }

  return new Response(body, { headers: XML_HEADERS });
}
