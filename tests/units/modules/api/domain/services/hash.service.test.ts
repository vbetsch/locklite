import 'reflect-metadata';
import { HashService } from '@api/domain/services/hash.service';
import { ApiLogger } from '@api/app/logs/api.logger';

jest.mock('bcrypt', (): unknown => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';

type HashFn = jest.MockedFunction<
  (data: string | Buffer, saltOrRounds: number) => Promise<string>
>;
type CompareFn = jest.MockedFunction<
  (data: string, encrypted: string) => Promise<boolean>
>;

describe('HashService', () => {
  const ORIGINAL_ENV: string | undefined = process.env.BCRYPT_SALT_ROUNDS;
  const DEFAULT_SALT: number = 10;
  const CUSTOM_SALT: number = 12;

  let service: HashService;
  let hashMock: HashFn;
  let compareMock: CompareFn;

  beforeEach((): void => {
    jest.resetAllMocks();
    process.env.BCRYPT_SALT_ROUNDS = String(DEFAULT_SALT);
    service = new HashService();
    hashMock = bcryptHash as unknown as HashFn;
    compareMock = bcryptCompare as unknown as CompareFn;
  });

  afterAll((): void => {
    process.env.BCRYPT_SALT_ROUNDS = ORIGINAL_ENV;
  });

  describe('hash', () => {
    it('hashes string with env-provided salt rounds', async (): Promise<void> => {
      process.env.BCRYPT_SALT_ROUNDS = String(CUSTOM_SALT);
      service = new HashService();

      const input: string = 'plain-text';
      const hashed: string = 'hashed-value';
      hashMock.mockResolvedValue(hashed);

      const result: string = await service.hash(input);

      expect(hashMock).toHaveBeenCalledWith(input, CUSTOM_SALT);
      expect(result).toBe(hashed);
    });

    it('falls back to default salt rounds when env var is missing', async (): Promise<void> => {
      delete (process.env as Record<string, string | undefined>)
        .BCRYPT_SALT_ROUNDS;
      service = new HashService();

      const input: string = 'hello';
      const hashed: string = 'hashed-default';
      hashMock.mockResolvedValue(hashed);

      const result: string = await service.hash(input);

      expect(hashMock).toHaveBeenCalledWith(input, DEFAULT_SALT);
      expect(result).toBe(hashed);
    });

    it('logs and rethrows when bcrypt.hash rejects', async (): Promise<void> => {
      const input: string = 'boom';
      const thrown: Error = new Error('hash-failure');
      hashMock.mockRejectedValue(thrown);

      const loggerSpy: jest.SpyInstance<void, [string, unknown]> = jest
        .spyOn(ApiLogger, 'error')
        .mockImplementation((): void => void 0);

      await expect(service.hash(input)).rejects.toThrow(thrown);
      expect(loggerSpy).toHaveBeenCalledWith(
        'An error occurred while hashing string : ',
        thrown
      );

      loggerSpy.mockRestore();
    });
  });

  describe('compare', () => {
    it('returns true when bcrypt.compare resolves true', async (): Promise<void> => {
      const data: string = 'plain';
      const ref: string = 'hash';
      compareMock.mockResolvedValue(true);

      const result: boolean = await service.compare(data, ref);

      expect(compareMock).toHaveBeenCalledWith(data, ref);
      expect(result).toBe(true);
    });

    it('returns false when bcrypt.compare resolves false', async (): Promise<void> => {
      const data: string = 'plain';
      const ref: string = 'hash';
      compareMock.mockResolvedValue(false);

      const result: boolean = await service.compare(data, ref);

      expect(compareMock).toHaveBeenCalledWith(data, ref);
      expect(result).toBe(false);
    });

    it('logs and rethrows when bcrypt.compare rejects', async (): Promise<void> => {
      const data: string = 'plain';
      const ref: string = 'hash';
      const thrown: Error = new Error('compare-failure');
      compareMock.mockRejectedValue(thrown);

      const loggerSpy: jest.SpyInstance<void, [string, unknown]> = jest
        .spyOn(ApiLogger, 'error')
        .mockImplementation((): void => void 0);

      await expect(service.compare(data, ref)).rejects.toThrow(thrown);
      expect(loggerSpy).toHaveBeenCalledWith(
        'An error occurred while comparing two hashes : ',
        thrown
      );

      loggerSpy.mockRestore();
    });
  });
});
