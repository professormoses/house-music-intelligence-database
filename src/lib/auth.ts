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

// ── Data API key (for bulk downloads + private fields) ──────────────────
export function dataApiKey(): string {
  return process.env.DATA_API_KEY || '';
}

// Authorized to access bulk dumps + private fields (contact emails). Admins
// always qualify; otherwise a valid data API key (x-api-key header or ?key=).
export function isDataAuthorized(req: Request): boolean {
  if (isAuthorized(req)) return true;
  const key = dataApiKey();
  if (!key) return false; // no key configured -> bulk locked to admins
  const header = req.headers.get('x-api-key');
  const qp = new URL(req.url).searchParams.get('key');
  return header === key || qp === key;
}

// Short, stable fingerprint of the requester's key — embedded in bulk exports
// so a leaked file traces back to who downloaded it.
export function watermarkFor(req: Request): string {
  const key = req.headers.get('x-api-key') || new URL(req.url).searchParams.get('key') || 'admin';
  let h = 0;
  const s = `hmid:${key}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return 'wm_' + h.toString(36);
}
