import { HttpError } from '@api/errors/http/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class ResourceAlreadyExistsError extends HttpError {
  public constructor() {
    super('Resource already exists', StatusCodes.CONFLICT);
  }
}
