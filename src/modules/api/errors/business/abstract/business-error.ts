import { HttpError } from '@api/errors/http/abstract/http-error';

export abstract class BusinessError extends HttpError {
  public readonly code: string;

  protected constructor(message: string, status: number, code: string) {
    super(message, status);
    this.code = code;
    this.name = this.constructor.name;
  }
}
