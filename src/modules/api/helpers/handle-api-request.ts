import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { ApiLogger } from '@api/logs/api.logger';
import { InternalServerError } from '@api/errors/internal-server.error';

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
    let httpError: HttpError;
    if (error instanceof HttpError) {
      httpError = error;
    } else {
      ApiLogger.error('Error while handling API errors: ', error);
      httpError = new InternalServerError();
    }
    return NextResponse.json(
      { error: httpError.message },
      { status: httpError.status }
    );
  }
}
