import { isAuthorized } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { ingestFromSource } from '@/lib/ingest';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Enrich a page of artists' links from MusicBrainz (host-mapped: instagram,
// spotify, apple music, soundcloud, bandcamp, beatport, traxsource, discogs,
// RA, youtube, website, wikidata). Page with ?offset & ?limit so the whole DB
// can be processed across many short calls. Auth required.
async function run(offset: number, limit: number) {
  const total = await prisma.artist.count();
  const rows = await prisma.artist.findMany({
    orderBy: { createdAt: 'asc' },
    skip: offset,
    take: limit,
    select: { artistName: true, slug: true },
  });
  let updated = 0;
  const results: any[] = [];
  for (const r of rows) {
    try {
      const res = await ingestFromSource('MusicBrainz', r.artistName);
      if (res.fieldsApplied > 0) updated++;
      results.push({ slug: r.slug, applied: res.fieldsApplied });
    } catch (e: any) {
      results.push({ slug: r.slug, error: String(e?.message ?? e) });
    }
  }
  const nextOffset = offset + rows.length;
  return { offset, processed: rows.length, updated, total, nextOffset, done: nextOffset >= total, results };
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const u = new URL(req.url);
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  const offset = parseInt(body.offset ?? u.searchParams.get('offset') ?? '0', 10);
  const limit = Math.min(20, Math.max(1, parseInt(body.limit ?? u.searchParams.get('limit') ?? '12', 10)));
  return Response.json(await run(offset, limit));
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const u = new URL(req.url);
  const offset = parseInt(u.searchParams.get('offset') ?? '0', 10);
  const limit = Math.min(20, Math.max(1, parseInt(u.searchParams.get('limit') ?? '12', 10)));
  return Response.json(await run(offset, limit));
}
