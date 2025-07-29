import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class NoVaultFoundError extends HttpError {
  public constructor() {
    super('Vault not found', StatusCodes.NOT_FOUND);
  }
}
