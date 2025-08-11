import { HttpError } from '@shared/errors/http-error';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedError extends HttpError {
  public constructor() {
    super('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
}
