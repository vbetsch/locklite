import { HttpError } from '@shared/errors/http-error';
import type { BusinessErrorCodeEnumDto } from '@shared/dto/output/errors/business-error-code.enum.dto';

export class BusinessError extends HttpError {
  public readonly code: BusinessErrorCodeEnumDto;

  public constructor(
    message: string,
    status: number,
    code: BusinessErrorCodeEnumDto
  ) {
    super(message, status);
    this.code = code;
    this.name = this.constructor.name;
  }
}
