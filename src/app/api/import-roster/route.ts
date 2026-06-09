import { isAuthorized } from '@/lib/auth';
import { importRoster } from '@/lib/ingest';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Grow the database from the curated roster up to a target count.
// POST { target: 200 | 500 | 1000 | 2000 }
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  const target = Math.max(1, parseInt(body.target ?? '200', 10));
  const result = await importRoster(target);
  return Response.json({
    target,
    ...result,
    note:
      result.exhausted
        ? `Curated roster is fully imported (${result.total} artists). To reach ${target}+, add more curated names or run source ingestion (Discogs/Spotify/MusicBrainz charts) with API keys + network.`
        : `Database grown to ${result.total} artists.`,
  });
}
