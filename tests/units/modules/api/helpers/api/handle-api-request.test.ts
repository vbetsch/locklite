jest.mock('next/server', (): unknown => ({
  NextResponse: {
    json: jest.fn(
      <T>(body: T, init: { status: number }): { body: T; status: number } => ({
        body,
        status: init.status,
      })
    ),
  },
}));

jest.mock('next-auth/jwt', (): unknown => ({
  getToken: jest.fn(async () => null),
}));

jest.mock('next-auth', (): unknown => ({
  getServerSession: jest.fn(async () => null),
}));

jest.mock('@lib/auth', (): unknown => ({
  authOptions: {},
}));

import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApiLogger } from '@api/logs/api.logger';
import { handleApiRequest } from '@api/helpers/api/handle-api-request';

interface IJsonResponse<T> {
  body: T;
  status: number;
}

type NextResponseJson = <T>(
  body: T,
  init: { status: number }
) => IJsonResponse<T>;

describe('handleApiRequest', () => {
  let jsonMock: jest.MockedFunction<NextResponseJson>;
  const fakeReq = {} as NextRequest;

  beforeEach((): void => {
    jsonMock =
      NextResponse.json as unknown as jest.MockedFunction<NextResponseJson>;
    jsonMock.mockClear();
  });

  it('should return 200 and data when callback resolves', async (): Promise<void> => {
    const data: { foo: string } = { foo: 'bar' };
    const callback: () => Promise<{ foo: string }> = jest.fn(() =>
      Promise.resolve(data)
    );

    const response: IJsonResponse<{ data: { foo: string } }> =
      await handleApiRequest<{ foo: string }>({
        request: fakeReq,
        needToBeAuthenticated: false,
        callback,
      });

    expect(jsonMock).toHaveBeenCalledWith({ data }, { status: StatusCodes.OK });
    expect(response).toEqual({ body: { data }, status: StatusCodes.OK });
    expect(callback).toHaveBeenCalled();
  });

  it('should return error message and status when HttpError is thrown', async (): Promise<void> => {
    const error: HttpError = new HttpError('Not Found', StatusCodes.NOT_FOUND);
    const callback: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(error)
    );

    const response: IJsonResponse<{
      error: { message: string; code?: number };
    }> = await handleApiRequest<unknown>({
      request: fakeReq,
      needToBeAuthenticated: false,
      callback,
    });

    expect(jsonMock).toHaveBeenCalledWith(
      { error: { message: error.message } },
      { status: error.status }
    );
    expect(response).toEqual({
      body: { error: { message: error.message } },
      status: error.status,
    });
    expect(callback).toHaveBeenCalled();
  });

  it('should log error and return 500 when non-HttpError is thrown', async (): Promise<void> => {
    const error: Error = new Error('Unexpected');
    const callback: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(error)
    );
    const loggerSpy: jest.SpyInstance<void, [string, unknown]> = jest
      .spyOn(ApiLogger, 'error')
      .mockImplementation((): void => {});

    const response: IJsonResponse<{ error: { message: string } }> =
      await handleApiRequest<unknown>({
        request: fakeReq,
        needToBeAuthenticated: false,
        callback,
      });

    expect(loggerSpy).toHaveBeenCalledWith(
      'Error while handling API errors: ',
      error
    );
    expect(jsonMock).toHaveBeenCalledWith(
      { error: { message: 'Internal Server Error' } },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
    expect(response).toStrictEqual({
      body: { error: { message: 'Internal Server Error' } },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
    expect(callback).toHaveBeenCalled();

    loggerSpy.mockRestore();
  });
});
