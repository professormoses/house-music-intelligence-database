import { topicWithEdges } from '@/lib/topics';
import { edgesToJson } from '@/lib/graph';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.json$/, '');
  const data = await topicWithEdges(slug);
  if (!data) return Response.json({ error: 'not_found', slug }, { status: 404 });
  return Response.json(
    { ...data.topic, relationships: edgesToJson(data.edges) },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=300' } },
  );
}
