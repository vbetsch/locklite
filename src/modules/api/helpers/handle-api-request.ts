import { HttpError } from '@shared/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { handlePrismaError } from '@api/helpers/handle-prisma-errors';
import type { PrismaErrorLike } from '@api/types/prisma-error-like.type';

export async function handleApiRequest<T>(
  callback: () => Promise<T>,
  successStatusCode?: StatusCodes
): Promise<NextResponse> {
  try {
    const data: Awaited<T> = await callback();

    if (successStatusCode === StatusCodes.NO_CONTENT) {
      return new NextResponse(null, { status: StatusCodes.NO_CONTENT });
    }

    return NextResponse.json(data, {
      status: successStatusCode || StatusCodes.OK,
    });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      typeof error.name === 'string'
    ) {
      return handlePrismaError(error as PrismaErrorLike);
    }

    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
