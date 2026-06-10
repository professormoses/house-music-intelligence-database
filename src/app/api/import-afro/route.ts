import { isAuthorized } from '@/lib/auth';
import { importAfroRoster } from '@/lib/ingest';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Bulk-add the curated Afro House roster.
export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const result = await importAfroRoster();
  return Response.json({ ...result, note: `Added ${result.added} curated Afro House artists (total ${result.total}).` });
}
