import { StatusCodes } from 'http-status-codes';
import { BusinessError } from '@shared/errors/business-error';
import { BusinessErrorCodeEnumDto } from '@shared/dto/output/errors/business-error-code.enum.dto';

export class VaultLabelTooLongError extends BusinessError {
  public constructor() {
    super(
      `The vault label must not exceed 255 characters`,
      StatusCodes.UNPROCESSABLE_ENTITY,
      BusinessErrorCodeEnumDto.VAULT_LABEL_TOO_LONG
    );
  }
}
