import type { NextRequest } from 'next/server';
import type { Mock } from 'jest-mock';
import { StatusCodes } from 'http-status-codes';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { ApiLogger } from '@api/app/logs/api.logger';
import { UnauthorizedError } from '@api/app/errors/unauthorized.error';
import { BusinessError } from '@shared/errors/business-error';
import { HttpError } from '@shared/errors/http-error';
import { InternalServerError } from '@api/app/errors/internal-server.error';
import { NextResponse } from 'next/server';
import { handleApiRequest } from '@api/app/helpers/handle-api-request';

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@api/app/logs/api.logger', () => ({
  ApiLogger: { error: jest.fn() },
}));

jest.mock('next/server', () => {
  const mockNextResponse: Mock = jest.fn() as Mock;
  mockNextResponse.json = jest.fn();
  return { NextResponse: mockNextResponse };
});

describe('handleApiRequest', () => {
  const mockRequest: NextRequest = {} as NextRequest;
  const mockData: Record<string, string> = { key: 'value' };
  const mockCallback: jest.Mock<Promise<unknown>, []> = jest.fn();

  beforeEach((): void => {
    jest.clearAllMocks();
    process.env.NEXTAUTH_SECRET = 'secret';
  });

  it('returns data with authentication', async (): Promise<void> => {
    (getToken as jest.Mock).mockResolvedValue({});
    (getServerSession as jest.Mock).mockResolvedValue({});
    mockCallback.mockResolvedValue(mockData);
    (NextResponse.json as jest.Mock).mockReturnValue('response');

    const result: unknown = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: true,
      callback: mockCallback,
    });

    expect(result).toBe('response');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { data: mockData },
      { status: StatusCodes.OK }
    );
  });

  it('returns data without authentication', async (): Promise<void> => {
    mockCallback.mockResolvedValue(mockData);
    (NextResponse.json as jest.Mock).mockReturnValue('response');

    const result: unknown = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(result).toBe('response');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { data: mockData },
      { status: StatusCodes.OK }
    );
  });

  it('returns no content when status code is NO_CONTENT', async (): Promise<void> => {
    mockCallback.mockResolvedValue(mockData);
    const noContentResponse: object = {};
    (NextResponse as unknown as jest.Mock).mockReturnValue(noContentResponse);

    const result: unknown = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
      successStatusCode: StatusCodes.NO_CONTENT,
    });

    expect(result).toBe(noContentResponse);
    expect(NextResponse).toHaveBeenCalledWith(null, {
      status: StatusCodes.NO_CONTENT,
    });
  });

  it('throws UnauthorizedError when no token', async (): Promise<void> => {
    (getToken as jest.Mock).mockResolvedValue(null);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: true,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new UnauthorizedError().message } },
      { status: new UnauthorizedError().status }
    );
  });

  it('throws UnauthorizedError when no session', async (): Promise<void> => {
    (getToken as jest.Mock).mockResolvedValue({});
    (getServerSession as jest.Mock).mockResolvedValue(null);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: true,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new UnauthorizedError().message } },
      { status: new UnauthorizedError().status }
    );
  });

  it('handles BusinessError', async (): Promise<void> => {
    const error: BusinessError = new BusinessError(
      'Business error',
      'BUSINESS_CODE',
      StatusCodes.BAD_REQUEST
    );
    mockCallback.mockRejectedValue(error);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: error.message, code: error.code } },
      { status: error.status }
    );
  });

  it('handles generic HttpError', async (): Promise<void> => {
    const error: HttpError = new HttpError(
      'Http error',
      StatusCodes.BAD_REQUEST
    );
    mockCallback.mockRejectedValue(error);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: error.message } },
      { status: error.status }
    );
  });

  it('handles unknown error as InternalServerError', async (): Promise<void> => {
    const error: Error = new Error('Unknown');
    mockCallback.mockRejectedValue(error);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(ApiLogger.error).toHaveBeenCalledWith(
      'Error while handling API errors: ',
      error
    );
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new InternalServerError().message } },
      { status: new InternalServerError().status }
    );
  });
});
