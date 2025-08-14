import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { handlePrismaError } from '@api/infra/prisma/helpers/handle-prisma-errors';
import type { PrismaErrorLike } from '@api/infra/prisma/prisma-error-like.type';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';

jest.mock('@api/infra/prisma/helpers/handle-prisma-errors', () => ({
  handlePrismaError: jest.fn(),
}));

const mockHandlePrismaError: jest.MockedFunction<typeof handlePrismaError> =
  jest.mocked(handlePrismaError);

describe('handlePrismaRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success cases', () => {
    it('should return callback result when successful', async () => {
      const expectedResult: { id: number; name: string } = {
        id: 1,
        name: 'Test User',
      };
      const successfulCallback: jest.MockedFunction<
        () => Promise<{ id: number; name: string }>
      > = jest.fn().mockResolvedValue(expectedResult);

      const result: { id: number; name: string } =
        await handlePrismaRequest(successfulCallback);

      expect(result).toEqual(expectedResult);
      expect(successfulCallback).toHaveBeenCalledTimes(1);
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should return undefined when callback returns undefined', async () => {
      const callbackReturningUndefined: jest.MockedFunction<
        () => Promise<undefined>
      > = jest.fn().mockResolvedValue(undefined);

      const result: undefined = await handlePrismaRequest(
        callbackReturningUndefined
      );

      expect(result).toBeUndefined();
      expect(callbackReturningUndefined).toHaveBeenCalledTimes(1);
    });

    it('should return null when callback returns null', async () => {
      const callbackReturningNull: jest.MockedFunction<() => Promise<null>> =
        jest.fn().mockResolvedValue(null);

      const result: null = await handlePrismaRequest(callbackReturningNull);

      expect(result).toBeNull();
      expect(callbackReturningNull).toHaveBeenCalledTimes(1);
    });

    it('should return array when callback returns array', async () => {
      const expectedArray: { id: number }[] = [{ id: 1 }, { id: 2 }];
      const callbackReturningArray: jest.MockedFunction<
        () => Promise<{ id: number }[]>
      > = jest.fn().mockResolvedValue(expectedArray);

      const result: { id: number }[] = await handlePrismaRequest(
        callbackReturningArray
      );

      expect(result).toEqual(expectedArray);
      expect(callbackReturningArray).toHaveBeenCalledTimes(1);
    });
  });

  describe('Prisma error handling', () => {
    it('should handle PrismaClientKnownRequestError', async () => {
      const prismaError: PrismaErrorLike = {
        name: 'PrismaClientKnownRequestError',
        code: 'P2002',
        message: 'Unique constraint violation',
      };
      const processedError: Error = new Error('Processed Prisma Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(prismaError);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(failingCallback).toHaveBeenCalledTimes(1);
      expect(mockHandlePrismaError).toHaveBeenCalledWith(prismaError);
    });

    it('should handle PrismaClientValidationError', async () => {
      const validationError: { name: string; message: string } = {
        name: 'PrismaClientValidationError',
        message: 'Invalid field value',
      };
      const processedError: Error = new Error('Validation Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(validationError);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(validationError);
    });

    it('should handle error with string name property', async () => {
      const errorWithStringName: {
        name: string;
        code: string;
        message: string;
      } = {
        name: 'CustomPrismaError',
        code: 'CUSTOM_001',
        message: 'Custom error message',
      };
      const processedError: Error = new Error('Custom Processed Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(errorWithStringName);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(errorWithStringName);
    });

    it('should handle error object with additional properties', async () => {
      const complexError: {
        name: string;
        message: string;
        clientVersion: string;
        meta: { connection_limit: number };
      } = {
        name: 'PrismaClientRustPanicError',
        message: 'Database connection failed',
        clientVersion: '5.0.0',
        meta: { connection_limit: 100 },
      };
      const processedError: Error = new Error('Connection Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(complexError);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(complexError);
    });
  });

  describe('non-Prisma error handling', () => {
    it('should rethrow string errors without processing', async () => {
      const stringError: string = 'Simple string error';
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(stringError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        stringError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should rethrow number errors without processing', async () => {
      const numberError: number = 500;
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(numberError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        numberError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should rethrow null errors without processing', async () => {
      const nullError: null = null;
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(nullError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        nullError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should rethrow undefined errors without processing', async () => {
      const undefinedError: undefined = undefined;
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(undefinedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        undefinedError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should rethrow Error objects without name property', async () => {
      const errorWithoutName: { message: string } = {
        message: 'Error without name',
      };
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(errorWithoutName);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        errorWithoutName
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should rethrow Error objects with non-string name property', async () => {
      const errorWithNonStringName: { name: number; message: string } = {
        name: 123,
        message: 'Invalid name type',
      };
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(errorWithNonStringName);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        errorWithNonStringName
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should process standard Error instances through handlePrismaError', async () => {
      const standardError: Error = new Error('Standard error');
      const processedError: Error = new Error('Processed Standard Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(standardError);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(standardError);
    });

    it('should process TypeError instances through handlePrismaError', async () => {
      const typeError: TypeError = new TypeError('Type error');
      const processedError: Error = new Error('Processed Type Error');
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(typeError);

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(typeError);
    });
  });

  describe('edge cases', () => {
    it('should handle callback that throws synchronously', async () => {
      const syncError: Error = new Error('Synchronous error');
      const processedError: Error = new Error('Processed Sync Error');
      const syncFailingCallback: jest.MockedFunction<() => Promise<never>> =
        jest.fn().mockImplementation(() => {
          throw syncError;
        });

      mockHandlePrismaError.mockReturnValue(processedError);

      await expect(handlePrismaRequest(syncFailingCallback)).rejects.toThrow(
        processedError
      );
      expect(mockHandlePrismaError).toHaveBeenCalledWith(syncError);
    });

    it('should handle empty object errors', async () => {
      const emptyObjectError: Record<string, never> = {};
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(emptyObjectError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        emptyObjectError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should handle array errors', async () => {
      const arrayError: string[] = ['error', 'array'];
      const failingCallback: jest.MockedFunction<() => Promise<never>> = jest
        .fn()
        .mockRejectedValue(arrayError);

      await expect(handlePrismaRequest(failingCallback)).rejects.toBe(
        arrayError
      );
      expect(mockHandlePrismaError).not.toHaveBeenCalled();
    });

    it('should preserve generic type of return value', async () => {
      interface IUser {
        id: number;
        email: string;
      }

      const user: IUser = { id: 1, email: 'test@example.com' };
      const typedCallback: jest.MockedFunction<() => Promise<IUser>> = jest
        .fn()
        .mockResolvedValue(user);

      const result: IUser = await handlePrismaRequest<IUser>(typedCallback);

      expect(result).toEqual(user);
      expect(result.id).toBe(1);
      expect(result.email).toBe('test@example.com');
    });
  });
});
