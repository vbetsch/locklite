import { HttpError } from '@shared/errors/http-error';
import type { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

export class BusinessError extends HttpError {
  public readonly code: BusinessErrorCodeEnum;

  public constructor(
    message: string,
    status: number,
    code: BusinessErrorCodeEnum
  ) {
    super(message, status);
    this.code = code;
    this.name = this.constructor.name;
  }

  public override toString(): string {
    return `[${this.code}] ${this.message}`;
  }
}
