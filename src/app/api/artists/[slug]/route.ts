import { getArtist } from '@/lib/queries';
import { redactContacts } from '@/lib/serialize';
import { isDataAuthorized } from '@/lib/auth';
import { edgesForSlug, edgesToJson } from '@/lib/graph';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.json$/, '');
  let a = await getArtist(slug);
  if (!a)
    return Response.json({ error: 'not_found', slug }, { status: 404 });
  if (!isDataAuthorized(req)) a = redactContacts(a);
  const edges = await edgesForSlug(slug);
  return Response.json(
    { ...a, relationships: edgesToJson(edges) },
    { headers: { 'cache-control': 'public, max-age=300', 'access-control-allow-origin': '*' } },
  );
}
