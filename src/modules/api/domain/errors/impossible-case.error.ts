import { BusinessError } from '@shared/errors/business-error';
import { StatusCodes } from 'http-status-codes';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class ImpossibleCaseError extends BusinessError {
  public constructor() {
    super(
      'This case should be impossible.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      BusinessErrorCodeEnum.IMPOSSIBLE_CASE
    );
  }
}
