import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /system routes
  if (pathname.startsWith('/system')) {
    // Check for auth token in cookies or localStorage
    // Note: In middleware, we can't access localStorage, so we'll rely on cookies
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Redirect to home page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/system/:path*',
};
