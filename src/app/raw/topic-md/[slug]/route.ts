import { topicWithEdges } from '@/lib/topics';
import { topicToMarkdown } from '@/lib/topics';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.md$/, '');
  const data = await topicWithEdges(slug);
  if (!data) return new Response('# Not found\n', { status: 404, headers: { 'content-type': 'text/markdown; charset=utf-8' } });
  return new Response(topicToMarkdown(data.topic, data.edges), {
    headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=300' },
  });
}
