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
      case 'P2000':
        return NextResponse.json(
          { error: 'One of the requested values is too long' },
          { status: 400 }
        );
      default:
        console.error(
          'Error: PrismaClientKnownRequestError not handled with code ' +
            error.code
        );
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
    }
  }
  if (error.name === 'PrismaClientValidationError') {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
  console.error(error);
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
