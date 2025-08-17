import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (
    process.env.NODE_ENV === 'production' &&
    (pathname.startsWith('/api/swagger') || pathname.startsWith('/api/docs'))
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}
