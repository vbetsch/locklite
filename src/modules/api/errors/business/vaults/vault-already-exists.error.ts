import { StatusCodes } from 'http-status-codes';
import { BusinessError } from '@shared/errors/business-error';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class VaultAlreadyExistsError extends BusinessError {
  public constructor(label: string) {
    super(
      `Vault with label '${label}' already exists`,
      StatusCodes.CONFLICT,
      BusinessErrorCodeEnum.VAULT_ALREADY_EXISTS
    );
  }
}
