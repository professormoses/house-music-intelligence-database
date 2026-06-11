import { isAuthorized } from '@/lib/auth';
import { discoverLAArtists } from '@/lib/discover';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Weekly LA intelligence. Triggered by Vercel Cron (Authorization: Bearer
// CRON_SECRET) or manually by an admin (cookie / x-admin-token). Searches
// MusicBrainz for newly-added house artists across SoCal cities and tags them
// by region (Greater LA / San Diego / Inland Empire).
async function run(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const result = await discoverLAArtists(120, 60000);
  return Response.json({
    ok: true,
    ...result,
    note: `LA discovery added ${result.added} new artist(s): ${JSON.stringify(result.byRegion)}. Total ${result.total}. Run "Enrich links" to fill their socials.`,
  });
}

export async function GET(req: Request) {
  return run(req);
}

export async function POST(req: Request) {
  return run(req);
}
