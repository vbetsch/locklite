import { HttpError } from '@api/errors/http-error';
import { StatusCodes } from 'http-status-codes';

export class UsersNotFoundError extends HttpError {
  public constructor() {
    super('Users not found', StatusCodes.NOT_FOUND);
  }
}
