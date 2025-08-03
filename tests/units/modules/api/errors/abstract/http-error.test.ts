import { HttpError } from '@api/errors/http/abstract/http-error';
import { StatusCodes } from 'http-status-codes';

class TestError extends HttpError {
  public constructor(message: string, status: number) {
    super(message, status);
  }
}

describe('HttpError', () => {
  it('should correctly set the message, status and name', () => {
    const message: string = 'An error occurred';
    const status: number = 418;
    const error: HttpError = new TestError(message, status);

    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
    expect(error.name).toBe('TestError');
  });

  it('should be an instance of Error', () => {
    const error: HttpError = new TestError(
      'Error',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(error).toBeInstanceOf(Error);
  });

  it('the stack property should contain the class name and the message', () => {
    const message: string = 'Stack test';
    const status: number = 400;
    const error: HttpError = new TestError(message, status);
    expect(error.stack).toContain('TestError');
    expect(error.stack).toContain(message);
  });
});
