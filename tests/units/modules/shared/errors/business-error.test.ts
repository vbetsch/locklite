import { BusinessError } from '@shared/errors/business-error';
import { HttpError } from '@shared/errors/http-error';
import { BusinessErrorCodeEnum } from '@shared/errors/business-error-code.enum';

describe('BusinessError', () => {
  const enumValues: BusinessErrorCodeEnum[] = Object.values(
    BusinessErrorCodeEnum
  );
  const sampleCode: BusinessErrorCodeEnum = enumValues[0];
  const message: string = 'Test business error';
  const status: number = 400;
  let error: BusinessError;

  beforeEach((): void => {
    error = new BusinessError(message, status, sampleCode);
  });

  it('should be instance of BusinessError, HttpError and Error', (): void => {
    expect(error).toBeInstanceOf(BusinessError);
    expect(error).toBeInstanceOf(HttpError);
    expect(error).toBeInstanceOf(Error);
  });

  it('should set message, status and code properties', (): void => {
    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
    expect(error.code).toBe(sampleCode);
  });

  it('should have name equal to class name', (): void => {
    expect(error.name).toBe('BusinessError');
  });

  it('toString() should return "[<code>] <message>"', (): void => {
    expect(error.toString()).toBe(`[${sampleCode}] ${message}`);
  });
});
