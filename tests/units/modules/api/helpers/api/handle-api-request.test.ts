jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@api/logs/api.logger', () => ({
  ApiLogger: { error: jest.fn() },
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

import { StatusCodes } from 'http-status-codes';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { ApiLogger } from '@api/logs/api.logger';
import { UnauthorizedError } from '@api/errors/http/unauthorized.error';
import { BusinessError } from '@shared/errors/business-error';
import { HttpError } from '@shared/errors/http-error';
import { InternalServerError } from '@api/errors/http/internal-server.error';
import { NextResponse } from 'next/server';
import { handleApiRequest } from '@api/helpers/api/handle-api-request';

describe('handleApiRequest', () => {
  const mockRequest = {} as any;
  const mockData = { key: 'value' };
  const mockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXTAUTH_SECRET = 'secret';
  });

  it('returns data with authentication', async () => {
    (getToken as jest.Mock).mockResolvedValue({});
    (getServerSession as jest.Mock).mockResolvedValue({});
    mockCallback.mockResolvedValue(mockData);
    (NextResponse.json as jest.Mock).mockReturnValue('response');

    const result = await handleApiRequest({
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

  it('returns data without authentication', async () => {
    mockCallback.mockResolvedValue(mockData);
    (NextResponse.json as jest.Mock).mockReturnValue('response');

    const result = await handleApiRequest({
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

  it('returns no content when status code is NO_CONTENT', async () => {
    mockCallback.mockResolvedValue(mockData);
    const noContentResponse = {};
    (NextResponse as any).mockImplementationOnce(() => noContentResponse);

    const result = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
      successStatusCode: StatusCodes.NO_CONTENT,
    });

    expect(result).toBe(noContentResponse);
  });

  it('throws UnauthorizedError when no token', async () => {
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

  it('throws UnauthorizedError when no session', async () => {
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

  it('handles BusinessError', async () => {
    const error = new BusinessError(
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

  it('handles generic HttpError', async () => {
    const error = new HttpError('Http error', StatusCodes.BAD_REQUEST);
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

  it('handles unknown error as InternalServerError', async () => {
    const error = new Error('Unknown');
    mockCallback.mockRejectedValue(error);

    await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(ApiLogger.error).toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new InternalServerError().message } },
      { status: new InternalServerError().status }
    );
  });
});
