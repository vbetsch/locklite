import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';

export class RequestedValueTooLongError extends HttpError {
  public constructor() {
    super('One of the requested values is too long', StatusCodes.BAD_REQUEST);
  }
}
