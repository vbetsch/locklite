import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { ApiLogger } from '@api/logs/api.logger';
import { InternalServerError } from '@api/errors/http/internal-server.error';
import { BusinessError } from '@shared/errors/business-error';

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
      if (error instanceof BusinessError) {
        return NextResponse.json(
          { error: { message: httpError.message, code: error.code } },
          { status: httpError.status }
        );
      }
    } else {
      ApiLogger.error('Error while handling API errors: ', error);
      httpError = new InternalServerError();
    }
    return NextResponse.json(
      { error: { message: httpError.message } },
      { status: httpError.status }
    );
  }
}
