import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { ApiLogger } from '@api/logs/api.logger';
import { InternalServerError } from '@api/errors/http/internal-server.error';
import { BusinessError } from '@shared/errors/business-error';
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import { UnauthorizedError } from '@api/errors/http/unauthorized.error';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export async function handleApiRequest<Data>(
  request: NextRequest,
  needToBeAuthenticated: boolean,
  callback: () => Promise<Data>,
  successStatusCode?: StatusCodes
): Promise<NextResponse<HttpResponseDto<Data>>> {
  try {
    const token: JWT | null = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      throw new UnauthorizedError();
    }

    if (needToBeAuthenticated) {
      const session: Session | null = await getServerSession(authOptions);
      if (!session) {
        throw new UnauthorizedError();
      }
    }

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
