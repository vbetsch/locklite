import { StatusCodes } from 'http-status-codes';
import { BusinessError } from '@shared/errors/business-error';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class VaultLabelTooLongError extends BusinessError {
  public constructor() {
    super(
      `The vault label must not exceed 255 characters`,
      StatusCodes.UNPROCESSABLE_ENTITY,
      BusinessErrorCodeEnum.VAULT_LABEL_TOO_LONG
    );
  }
}
