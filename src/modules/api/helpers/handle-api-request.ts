import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { Logger } from '@shared/logs/logger';

export async function handleApiRequest<Data>(
  callback: () => Promise<Data>,
  successStatusCode?: StatusCodes
): Promise<NextResponse<HttpResponseDto<Data>>> {
  try {
    const data: Awaited<Data> = await callback();

    if (successStatusCode === StatusCodes.NO_CONTENT) {
      return new NextResponse(null, { status: StatusCodes.NO_CONTENT });
    }

    return NextResponse.json(
      { data },
      {
        status: successStatusCode || StatusCodes.OK,
      }
    );
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    Logger.error(`Error while handling API errors: ${error}`);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
