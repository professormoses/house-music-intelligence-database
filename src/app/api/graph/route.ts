import { buildGraph } from '@/lib/graph';

export const dynamic = 'force-dynamic';

export async function GET() {
  const graph = await buildGraph();
  return Response.json(
    { ...graph, node_count: graph.nodes.length, edge_count: graph.edges.length, generated_at: new Date().toISOString() },
    { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=300' } },
  );
}
