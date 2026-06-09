import { isAuthorized } from '@/lib/auth';
import { exportToGoogleSheets, exportToFiles } from '@/lib/sheets';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function POST(req: Request) {
  if (!isAuthorized(req)) return Response.json({ error: 'unauthorized' }, { status: 401 });
  const target = new URL(req.url).searchParams.get('target') ?? 'auto';

  if (target === 'files') return Response.json(await exportToFiles());

  const sheets = await exportToGoogleSheets();
  if (sheets.ok) return Response.json(sheets);

  // Fall back to local files when Sheets isn't configured.
  const files = await exportToFiles();
  return Response.json({ ...files, sheets_note: sheets.detail });
}
