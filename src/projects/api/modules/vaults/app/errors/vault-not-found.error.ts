import { BusinessError } from '@shared/errors/business-error';
import { StatusCodes } from 'http-status-codes';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class VaultNotFoundError extends BusinessError {
  public constructor(vaultId: string) {
    super(
      `Vault with ID ${vaultId} not found`,
      StatusCodes.NOT_FOUND,
      BusinessErrorCodeEnum.VAULT_NOT_FOUND
    );
  }
}
