import { allTopics, topicsByType } from '@/lib/topics';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const type = new URL(req.url).searchParams.get('type');
  const topics = type ? await topicsByType(type) : await allTopics();
  return Response.json(
    { count: topics.length, topics: topics.map((t) => ({ slug: t.slug, title: t.title, type: t.type, summary: t.summary, url: t.canonical_url, markdown_url: t.markdown_url, json_url: t.json_url, confidence_score: t.confidence_score })) },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=300' } },
  );
}
