import { isAuthorized } from '@/lib/auth';
import { upsertCustomArtist, type CustomArtistInput } from '@/lib/ingest';
import { abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

// Create or update an artist with first-party / curated details. Admin only.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* */
  }
  if (!body?.name) return Response.json({ error: 'missing_name' }, { status: 400 });
  const res = await upsertCustomArtist(body as CustomArtistInput);
  return Response.json({ ...res, url: abs(`/artist/${res.slug}`), json_url: abs(`/api/artists/${res.slug}.json`) });
}
