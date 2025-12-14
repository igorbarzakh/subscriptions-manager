import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PRIVATE_PREFIXES = ['/dashboard', '/subscriptions'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isPrivate) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/dashboard/:path*', '/subscriptions/:path*'],
};
