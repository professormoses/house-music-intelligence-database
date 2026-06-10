import { isAuthorized } from '@/lib/auth';
import { discoverArtists, AFRO_TAGS } from '@/lib/discover';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Search MusicBrainz for house artists and add up to `limit` NEW ones.
// Pass { focus: 'afro' } to target Afro House / Afro Tech specifically.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  const limit = Math.min(250, Math.max(1, parseInt(body.limit ?? '250', 10)));
  const tags = body.focus === 'afro' || Array.isArray(body.tags) ? (Array.isArray(body.tags) ? body.tags : AFRO_TAGS) : undefined;
  const result = await discoverArtists(limit, 45000, tags);
  return Response.json({ ...result, note: `Added ${result.added} new artists from MusicBrainz${tags ? ' (Afro focus)' : ' house tags'} (total ${result.total}). Run "Enrich links" next to fill their socials/streaming.` });
}
