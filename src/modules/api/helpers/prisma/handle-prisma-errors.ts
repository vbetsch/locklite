import type { PrismaErrorLike } from '@api/types/prisma-error-like.type';
import type { HttpError } from '@api/errors/abstract/http-error';
import { InternalServerError } from '@api/errors/internal-server.error';
import { ResourceAlreadyExistsError } from '@api/errors/prisma/resource-already-exists.error';
import { ResourceNotFoundError } from '@api/errors/prisma/resource-not-found.error';
import { RequestedValueTooLongError } from '@api/errors/prisma/requested-value-too-long.error';
import { InvalidRequestDataError } from '@api/errors/prisma/invalid-request-data.error';

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
        console.error(
          'Error: PrismaClientKnownRequestError not handled with code ' +
            error.code
        );
        return new InternalServerError();
    }
  }
  if (error.name === 'PrismaClientValidationError') {
    return new InvalidRequestDataError();
  }
  console.error('Error while handling prisma errors: ', error);
  return new InternalServerError();
}
