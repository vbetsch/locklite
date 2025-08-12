import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { HttpResponseDto } from '@shared/dto/output/http.response.dto';
import { ApiLogger } from '@api/app/api.logger';
import { InternalServerError } from '@api/app/errors/internal-server.error';
import { BusinessError } from '@shared/errors/business-error';
import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import { UnauthorizedError } from '@api/app/errors/unauthorized.error';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export type HandleApiRequestArgs<Data> = {
  request: NextRequest;
  needToBeAuthenticated: boolean;
  callback: () => Promise<Data>;
  successStatusCode?: StatusCodes;
};

export async function handleApiRequest<Data>(
  args: HandleApiRequestArgs<Data>
): Promise<NextResponse<HttpResponseDto<Data>>> {
  try {
    if (args.needToBeAuthenticated) {
      const token: JWT | null = await getToken({
        req: args.request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        throw new UnauthorizedError();
      }

      const session: Session | null = await getServerSession(authOptions);
      if (!session) {
        throw new UnauthorizedError();
      }
    }

    const data: Awaited<Data> = await args.callback();

    if (args.successStatusCode === StatusCodes.NO_CONTENT) {
      return new NextResponse(null, { status: StatusCodes.NO_CONTENT });
    }

    return NextResponse.json(
      { data },
      {
        status: args.successStatusCode || StatusCodes.OK,
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
      ApiLogger.error({ message: 'Error while handling API errors: ', error });
      httpError = new InternalServerError();
    }
    return NextResponse.json(
      { error: { message: httpError.message } },
      { status: httpError.status }
    );
  }
}
