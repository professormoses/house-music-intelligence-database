import { isAuthorized } from '@/lib/auth';
import { repopulate } from '@/lib/pipeline';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* no body */
  }
  const summary = await repopulate({
    limit: body.limit ?? undefined,
    slugs: body.slugs ?? undefined,
    refreshExisting: body.refreshExisting ?? true,
  });
  return Response.json(summary);
}

// Vercel Cron invokes scheduled jobs with a GET (Authorization: Bearer
// CRON_SECRET). Refresh a small batch to stay within the function time limit.
export async function GET(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const limit = parseInt(new URL(req.url).searchParams.get('limit') || '12', 10);
  const summary = await repopulate({ limit });
  return Response.json(summary);
}
