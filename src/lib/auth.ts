// Minimal admin gate. For production, replace with real auth (NextAuth, etc.).
export function adminToken(): string {
  return process.env.ADMIN_TOKEN || 'dev-admin-token-change-me';
}

export const ADMIN_COOKIE = 'hmid_admin';

export function isAuthorized(req: Request): boolean {
  const header = req.headers.get('x-admin-token');
  const url = new URL(req.url);
  const qp = url.searchParams.get('token');
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|;\s*)hmid_admin=([^;]+)/);
  const cookieTok = m ? decodeURIComponent(m[1]) : null;
  if ([header, qp, cookieTok].includes(adminToken())) return true;

  // Vercel Cron sends "Authorization: Bearer <CRON_SECRET>" on scheduled runs.
  const bearer = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const cronSecret = process.env.CRON_SECRET;
  if (bearer && (bearer === cronSecret || bearer === adminToken())) return true;
  return false;
}

export function checkTokenValue(token?: string | null): boolean {
  return token === adminToken();
}
