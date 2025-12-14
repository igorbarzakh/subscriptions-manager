import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PRIVATE_MATCHERS = ['/dashboard', '/subscriptions'];
const PUBLIC_ONLY_MATCHERS = ['/login', '/register']; // опционально

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_MATCHERS.some((p) => pathname.startsWith(p));
  const isPublicOnly = PUBLIC_ONLY_MATCHERS.some((p) => pathname.startsWith(p));

  // Достаём токен (jwt strategy)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthed = !!token;

  // 1) Приватные роуты → требуем логин
  if (isPrivate && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 2) Public-only роуты (login/register) → если уже залогинен, отправляем в dashboard
  if (isPublicOnly && isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Важно: ограничиваем, чтобы не трогать статику и api-роуты
export const config = {
  matcher: ['/dashboard/:path*', '/subscriptions/:path*', '/login', '/register'],
};
