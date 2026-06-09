import { getArtist } from '@/lib/queries';
import { artistToMarkdown } from '@/lib/format';
import { edgesForSlug } from '@/lib/graph';
import { abs } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug.replace(/\.md$/, '');
  const a = await getArtist(slug);
  if (!a) return new Response('# Not found\n', { status: 404, headers: { 'content-type': 'text/markdown; charset=utf-8' } });

  let md = artistToMarkdown(a);
  const edges = await edgesForSlug(slug);
  if (edges.length) {
    const lines = ['', '## Knowledge graph', ''];
    for (const e of edges) {
      const rel = e.direction === 'out'
        ? `**${a.artist_name}** ${e.predicateLabel} **${e.objectName}**`
        : `**${e.subjectSlug}** ${e.predicateLabel} **${a.artist_name}**`;
      lines.push(`- ${rel}${e.sourceUrl ? ` _(source: ${e.sourceUrl})_` : ''}`);
    }
    lines.push('', `_Explore the full graph: ${abs('/api/graph')} · ${abs('/datasets/graph.jsonld')}_`, '');
    // insert the graph section before the "How to cite" block
    md = md.replace('## How to cite this page', lines.join('\n') + '\n## How to cite this page');
  }

  return new Response(md, {
    headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=300' },
  });
}
