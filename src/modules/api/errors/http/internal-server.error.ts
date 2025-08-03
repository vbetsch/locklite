import { HttpError } from '@api/errors/http/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class InternalServerError extends HttpError {
  public constructor() {
    super('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
