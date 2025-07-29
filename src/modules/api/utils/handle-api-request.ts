import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function handleApiRequest<T>(
  callback: () => Promise<T>,
  successStatusCode?: StatusCodes
): Promise<NextResponse> {
  try {
    const data: Awaited<T> = await callback();
    return NextResponse.json(data, {
      status: successStatusCode || StatusCodes.OK,
    });
  } catch (error) {
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
