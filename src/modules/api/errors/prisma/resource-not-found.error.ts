import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class ResourceNotFoundError extends HttpError {
  public constructor() {
    super('Resource not found', StatusCodes.NOT_FOUND);
  }
}
