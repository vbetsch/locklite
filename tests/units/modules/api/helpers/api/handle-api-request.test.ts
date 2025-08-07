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

jest.mock('next-auth/jwt');
jest.mock('next-auth');
jest.mock('@api/logs/api.logger');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('handleApiRequest', () => {
  const mockRequest = {} as any;
  const mockData = { key: 'value' };
  const mockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXTAUTH_SECRET = 'secret';
  });

  it('should return data with authentication', async () => {
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

  it('should return data without authentication', async () => {
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

  it('should return no content when status code is NO_CONTENT', async () => {
    mockCallback.mockResolvedValue(mockData);
    const mockNoContentResponse = {};
    jest
      .spyOn(require('next/server'), 'NextResponse')
      .mockImplementationOnce(() => mockNoContentResponse as any);

    const result = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
      successStatusCode: StatusCodes.NO_CONTENT,
    });

    expect(result).toBe(mockNoContentResponse);
  });

  it('should throw UnauthorizedError when no token', async () => {
    (getToken as jest.Mock).mockResolvedValue(null);

    const result = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: true,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new UnauthorizedError().message } },
      { status: new UnauthorizedError().status }
    );
  });

  it('should throw UnauthorizedError when no session', async () => {
    (getToken as jest.Mock).mockResolvedValue({});
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const result = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: true,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: new UnauthorizedError().message } },
      { status: new UnauthorizedError().status }
    );
  });

  it('should handle BusinessError', async () => {
    const error = new BusinessError(
      'Business error',
      'BUSINESS_CODE',
      StatusCodes.BAD_REQUEST
    );
    mockCallback.mockRejectedValue(error);

    const result = await handleApiRequest({
      request: mockRequest,
      needToBeAuthenticated: false,
      callback: mockCallback,
    });

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: { message: error.message, code: error.code } },
      { status: error.status }
    );
  });

  it('should handle generic HttpError', async () => {
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

  it('should handle unknown error as InternalServerError', async () => {
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
