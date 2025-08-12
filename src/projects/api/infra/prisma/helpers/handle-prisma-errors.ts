import type { PrismaErrorLike } from '@api/infra/prisma/prisma-error-like.type';
import type { HttpError } from '@shared/errors/http-error';
import { InternalServerError } from '@api/app/errors/internal-server.error';
import { ResourceAlreadyExistsError } from '@api/infra/prisma/errors/resource-already-exists.error';
import { ResourceNotFoundError } from '@api/infra/prisma/errors/resource-not-found.error';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { InvalidRequestDataError } from '@api/infra/prisma/errors/invalid-request-data.error';
import { ApiLogger } from '@api/app/api.logger';

export function handlePrismaError(error: PrismaErrorLike): HttpError {
  if (error.name === 'PrismaClientKnownRequestError') {
    switch (error.code) {
      case 'P2002':
        return new ResourceAlreadyExistsError();
      case 'P2025':
        return new ResourceNotFoundError();
      case 'P2000':
        return new RequestedValueTooLongError();
      default:
        ApiLogger.error(
          'PrismaClientKnownRequestError not handled with code ' + error.code
        );
        return new InternalServerError();
    }
  }
  if (error.name === 'PrismaClientValidationError') {
    return new InvalidRequestDataError();
  }
  ApiLogger.error('Error while handling prisma errors: ', error);
  return new InternalServerError();
}
