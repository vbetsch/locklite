import { StatusCodes } from 'http-status-codes';
import { BusinessError } from '@shared/errors/business-error';
import { BusinessErrorCodeEnumDto } from '@shared/dto/output/errors/business-error-code.enum.dto';

export class VaultAlreadyExistsError extends BusinessError {
  public constructor(label: string) {
    super(
      `Vault with label '${label}' already exists`,
      StatusCodes.CONFLICT,
      BusinessErrorCodeEnumDto.VAULT_ALREADY_EXISTS
    );
  }
}
