import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user_email');
  const { pathname } = request.nextUrl;

  const accessingAuth = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (!userCookie && !accessingAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (userCookie && accessingAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
