import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  if (request.cookies.has('theme')) {
    return response;
  }

  const prefersDark =
    request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
  const theme = prefersDark ? 'dark' : 'light';

  response.cookies.set('theme', theme, {
    path: '/',
    httpOnly: false,
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
