import { HttpError } from '@api/errors/http/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class InvalidRequestDataError extends HttpError {
  public constructor() {
    super('Invalid request data', StatusCodes.BAD_REQUEST);
  }
}
