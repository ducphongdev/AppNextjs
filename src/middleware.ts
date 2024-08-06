import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = ['/login', '/signup'];

const organizationPathRegex = /^\/organization\/.*$/;
const boardPathRegex = /^\/board\/.*$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get('next-auth.session-token')?.value;
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && access_token) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }
  if (
    (boardPathRegex.test(pathname) || organizationPathRegex.test(pathname)) &&
    !access_token
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/organization/:path*', '/login', '/signup', '/board/:path*'],
};
