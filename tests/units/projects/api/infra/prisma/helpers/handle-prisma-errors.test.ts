import 'reflect-metadata';
import type { PrismaErrorLike } from '@api/infra/prisma/prisma-error-like.type';
import { ResourceAlreadyExistsError } from '@api/infra/prisma/errors/resource-already-exists.error';
import { ResourceNotFoundError } from '@api/infra/prisma/errors/resource-not-found.error';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { InvalidRequestDataError } from '@api/infra/prisma/errors/invalid-request-data.error';
import { InternalServerError } from '@api/app/errors/internal-server.error';
import { ApiLogger } from '@api/app/api.logger';
import { handlePrismaError } from '@api/infra/prisma/helpers/handle-prisma-errors';

describe('handlePrismaError', () => {
  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it('returns ResourceAlreadyExistsError for PrismaClientKnownRequestError with P2002', (): void => {
    const error: PrismaErrorLike = {
      name: 'PrismaClientKnownRequestError',
      code: 'P2002',
    };

    const result: unknown = handlePrismaError(error);

    expect(result).toBeInstanceOf(ResourceAlreadyExistsError);
  });

  it('returns ResourceNotFoundError for PrismaClientKnownRequestError with P2025', (): void => {
    const error: PrismaErrorLike = {
      name: 'PrismaClientKnownRequestError',
      code: 'P2025',
    };

    const result: unknown = handlePrismaError(error);

    expect(result).toBeInstanceOf(ResourceNotFoundError);
  });

  it('returns RequestedValueTooLongError for PrismaClientKnownRequestError with P2000 (TS-F1.3)', (): void => {
    const error: PrismaErrorLike = {
      name: 'PrismaClientKnownRequestError',
      code: 'P2000',
    };

    const result: unknown = handlePrismaError(error);

    expect(result).toBeInstanceOf(RequestedValueTooLongError);
  });

  it('logs and returns InternalServerError for PrismaClientKnownRequestError with unknown code', (): void => {
    const error: PrismaErrorLike = {
      name: 'PrismaClientKnownRequestError',
      code: 'P1234',
    };
    const spy: jest.SpyInstance<void, [string, unknown?]> = jest
      .spyOn(ApiLogger, 'error')
      .mockImplementation((): void => void 0);

    const result: unknown = handlePrismaError(error);

    expect(spy).toHaveBeenCalledWith({
      message: 'PrismaClientKnownRequestError not handled with code P1234',
    });
    expect(result).toBeInstanceOf(InternalServerError);
  });

  it('returns InvalidRequestDataError for PrismaClientValidationError', (): void => {
    const error: PrismaErrorLike = {
      name: 'PrismaClientValidationError',
    };

    const result: unknown = handlePrismaError(error);

    expect(result).toBeInstanceOf(InvalidRequestDataError);
  });

  it('logs and returns InternalServerError for unknown error name', (): void => {
    const error: PrismaErrorLike = {
      name: 'SomethingElse',
      code: 'ANY',
    };
    const spy: jest.SpyInstance<void, [string, unknown?]> = jest
      .spyOn(ApiLogger, 'error')
      .mockImplementation((): void => void 0);

    const result: unknown = handlePrismaError(error);

    expect(spy).toHaveBeenCalledWith({
      message: 'Error while handling prisma errors: ',
      error,
    });
    expect(result).toBeInstanceOf(InternalServerError);
  });
});
