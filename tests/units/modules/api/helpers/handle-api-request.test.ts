jest.mock('next/server', (): unknown => {
  return {
    NextResponse: {
      json: jest.fn(
        <T>(
          body: T,
          init: { status: number }
        ): { body: T; status: number } => ({
          body,
          status: init.status,
        })
      ),
    },
  };
});

import { handleApiRequest } from '@api/helpers/handle-api-request';
import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { ApiLogger } from '@api/logs/api.logger';

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

  beforeEach((): void => {
    jsonMock = NextResponse.json as jest.MockedFunction<NextResponseJson>;
    jsonMock.mockClear();
  });

  it('returns 200 and data when callback resolves', async (): Promise<void> => {
    const data: { foo: string } = { foo: 'bar' };
    const callback: () => Promise<{ foo: string }> = jest.fn(() =>
      Promise.resolve(data)
    );

    const response = await handleApiRequest(callback);

    expect(jsonMock).toHaveBeenCalledWith({ data }, { status: StatusCodes.OK });
    expect(response).toEqual({ body: { data }, status: StatusCodes.OK });
    expect(callback).toHaveBeenCalled();
  });

  it('returns error message and status when HttpError is thrown', async (): Promise<void> => {
    const error: HttpError = new HttpError('Not Found', StatusCodes.NOT_FOUND);
    const callback: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(error)
    );

    const response = await handleApiRequest(callback);

    expect(jsonMock).toHaveBeenCalledWith(
      { error: error.message },
      { status: error.status }
    );
    expect(response).toEqual({
      body: { error: error.message },
      status: error.status,
    });
    expect(callback).toHaveBeenCalled();
  });

  it('logs error and returns 500 when non-HttpError is thrown', async (): Promise<void> => {
    const error: Error = new Error('Unexpected');
    const callback: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(error)
    );
    const loggerSpy: jest.SpyInstance<void, [string, unknown]> = jest
      .spyOn(ApiLogger, 'error')
      .mockImplementation((): void => {});

    const response = await handleApiRequest(callback);

    expect(loggerSpy).toHaveBeenCalledWith(
      'Error while handling API errors: ',
      error
    );
    expect(jsonMock).toHaveBeenCalledWith(
      { error: 'Internal Server Error' },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
    expect(response).toEqual({
      body: { error: 'Internal Server Error' },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
    expect(callback).toHaveBeenCalled();

    loggerSpy.mockRestore();
  });
});
