import { StatusCodes } from 'http-status-codes';
import { BusinessError } from '@shared/errors/business-error';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class UserAlreadyExistsError extends BusinessError {
  public constructor(email: string) {
    super(
      `User with email '${email}' already exists`,
      StatusCodes.CONFLICT,
      BusinessErrorCodeEnum.USER_ALREADY_EXISTS
    );
  }
}
