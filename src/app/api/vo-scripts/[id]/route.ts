import { isAuthorized } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Full script body. ?format=txt downloads the file; default returns JSON.
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return new Response('unauthorized', { status: 401 });
  const row = await prisma.voScript.findUnique({ where: { id: params.id } });
  if (!row) return new Response('not found', { status: 404 });

  const fmt = new URL(req.url).searchParams.get('format');
  if (fmt === 'txt') {
    const name = `${row.artistSlug}-55s-vo.txt`;
    return new Response(row.body, {
      headers: { 'content-type': 'text/plain; charset=utf-8', 'content-disposition': `attachment; filename="${name}"` },
    });
  }
  return Response.json(row);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  await prisma.voScript.delete({ where: { id: params.id } }).catch(() => {});
  return Response.json({ ok: true });
}
