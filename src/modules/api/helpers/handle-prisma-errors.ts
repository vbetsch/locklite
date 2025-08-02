import { NextResponse } from 'next/server';
import type { PrismaErrorLike } from '@api/types/prisma-error-like.type';
import { StatusCodes } from 'http-status-codes';

export function handlePrismaError(error: PrismaErrorLike): NextResponse {
  if (error.name === 'PrismaClientKnownRequestError') {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          { error: 'Resource already exists' },
          { status: StatusCodes.CONFLICT }
        );
      case 'P2025':
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: StatusCodes.NOT_FOUND }
        );
      case 'P2000':
        return NextResponse.json(
          { error: 'One of the requested values is too long' },
          { status: StatusCodes.BAD_REQUEST }
        );
      default:
        console.error(
          'Error: PrismaClientKnownRequestError not handled with code ' +
            error.code
        );
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
  }
  if (error.name === 'PrismaClientValidationError') {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
  console.error(error);
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: StatusCodes.INTERNAL_SERVER_ERROR }
  );
}
