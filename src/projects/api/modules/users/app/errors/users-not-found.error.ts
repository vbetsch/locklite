import { BusinessError } from '@shared/errors/business-error';
import { StatusCodes } from 'http-status-codes';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class UsersNotFoundError extends BusinessError {
  public constructor(emails: string[]) {
    super(
      `Users not found: ${emails.join(', ')}`,
      StatusCodes.NOT_FOUND,
      BusinessErrorCodeEnum.USERS_NOT_FOUND
    );
  }
}
