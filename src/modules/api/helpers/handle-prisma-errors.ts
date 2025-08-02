import { NextResponse } from 'next/server';
import type { PrismaErrorLike } from '@api/types/prisma-error-like.type';

export function handlePrismaError(error: PrismaErrorLike): NextResponse {
  if (error.name === 'PrismaClientKnownRequestError') {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          { error: 'Resource already exists' },
          { status: 409 }
        );
      case 'P2025':
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: 404 }
        );
      default:
        break;
    }
  }
  if (error.name === 'PrismaClientValidationError') {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
