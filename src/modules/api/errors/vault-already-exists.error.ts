import { HttpError } from '@api/errors/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

export class VaultAlreadyExistsError extends HttpError {
  public constructor(label: string) {
    super(`Vault with label '${label}' already exists`, StatusCodes.CONFLICT);
  }
}
