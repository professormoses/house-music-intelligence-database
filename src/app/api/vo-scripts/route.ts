import { isAuthorized } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// List generated VO scripts (newest first).
export async function GET(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const rows = await prisma.voScript.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: { id: true, artistSlug: true, artistName: true, title: true, wordCount: true, durationSec: true, popularity: true, generator: true, createdAt: true },
  });
  return Response.json({ count: rows.length, scripts: rows });
}
