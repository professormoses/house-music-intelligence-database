import { isAuthorized } from '@/lib/auth';
import { discoverArtists } from '@/lib/discover';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Search MusicBrainz for house artists and add up to `limit` NEW ones.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  const limit = Math.min(250, Math.max(1, parseInt(body.limit ?? '250', 10)));
  const result = await discoverArtists(limit);
  return Response.json({ ...result, note: `Added ${result.added} new artists from MusicBrainz house tags (total ${result.total}). Run "Enrich links" next to fill their socials/streaming.` });
}
