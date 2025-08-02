import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export function handlePrismaError(error: unknown): NextResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          { error: 'Resource already exists.' },
          { status: 409 }
        );
      case 'P2025':
        return NextResponse.json(
          { error: 'Resource not found.' },
          { status: 404 }
        );
      default:
        break;
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      { error: 'Invalid request data.' },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { error: 'Internal Server Error.' },
    { status: 500 }
  );
}
