import { renderDoc } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { doc: string } }) {
  const md = await renderDoc(params.doc);
  if (md === null)
    return new Response('# 404 — unknown document\n\nSee /llms.txt for the document index.\n', {
      status: 404,
      headers: { 'content-type': 'text/markdown; charset=utf-8' },
    });
  return new Response(md, {
    headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=300' },
  });
}
