import { isAuthorized } from '@/lib/auth';
import { ingestFromSource } from '@/lib/ingest';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

// Search one source for an artist and grow the database. POST { source, query }.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  const source = (body.source ?? '').toString().trim();
  const query = (body.query ?? '').toString().trim();
  if (!source || !query) return Response.json({ error: 'missing_source_or_query' }, { status: 400 });

  const result = await ingestFromSource(source, query);
  const total = await prisma.artist.count();
  return Response.json({ ...result, total_artists: total, artist_url: result.slug ? `/artist/${result.slug}` : null });
}
