import { prisma } from '@/lib/db';
import { abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get('date');
  if (!date) return Response.json({ error: 'missing_date', hint: 'use ?date=YYYY-MM-DD' }, { status: 400 });
  const since = new Date(date.length === 10 ? `${date}T00:00:00Z` : date);
  if (isNaN(since.getTime())) return Response.json({ error: 'invalid_date' }, { status: 400 });

  const [artists, changes] = await Promise.all([
    prisma.artist.findMany({ where: { updatedAt: { gte: since } }, select: { slug: true, artistName: true, updatedAt: true } }),
    prisma.changeLog.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: 'desc' }, take: 1000 }),
  ]);

  return Response.json(
    {
      since: since.toISOString(),
      changed_artists: artists.map((a) => ({
        slug: a.slug,
        artist_name: a.artistName,
        updated_at: a.updatedAt.toISOString(),
        json_url: abs(`/api/artists/${a.slug}.json`),
      })),
      change_log: changes,
    },
    { headers: { 'access-control-allow-origin': '*' } },
  );
}
