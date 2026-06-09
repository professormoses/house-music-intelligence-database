import { NextResponse } from 'next/server';
import { checkTokenValue, ADMIN_COOKIE } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const COOKIE_OPTS = { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' as const };

// POST from the login form (field: token). Sets a cookie so you stay signed in.
export async function POST(req: Request) {
  const form = await req.formData();
  const token = String(form.get('token') ?? '');
  if (!checkTokenValue(token)) return NextResponse.redirect(new URL('/admin?error=1', req.url));
  const res = NextResponse.redirect(new URL('/admin', req.url));
  res.cookies.set(ADMIN_COOKIE, token, COOKIE_OPTS);
  return res;
}

// GET handles a bookmarkable ?token link and ?logout=1.
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('logout')) {
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set(ADMIN_COOKIE, '', { ...COOKIE_OPTS, maxAge: 0 });
    return res;
  }
  const token = url.searchParams.get('token') ?? '';
  if (!checkTokenValue(token)) return NextResponse.redirect(new URL('/admin?error=1', req.url));
  const res = NextResponse.redirect(new URL('/admin', req.url));
  res.cookies.set(ADMIN_COOKIE, token, COOKIE_OPTS);
  return res;
}
