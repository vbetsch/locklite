import { injectable } from 'tsyringe';
import { compare, hash } from 'bcrypt';
import { ApiLogger } from '@api/app/api.logger';

@injectable()
export class HashService {
  private readonly _salt: number = parseInt(
    process.env.BCRYPT_SALT_ROUNDS || '10',
    10
  );

  private async _hashString(str: string | Buffer): Promise<string> {
    return await hash(str, this._salt);
  }

  private async _compareTwoHashes(str: string, ref: string): Promise<boolean> {
    return await compare(str, ref);
  }

  public async hash(str: string): Promise<string> {
    try {
      return await this._hashString(str);
    } catch (error: unknown) {
      ApiLogger.error({
        message: 'An error occurred while hashing string : ',
        error,
      });
      throw error;
    }
  }

  public async compare(
    hashedInput: string,
    refValue: string
  ): Promise<boolean> {
    try {
      return await this._compareTwoHashes(hashedInput, refValue);
    } catch (error: unknown) {
      ApiLogger.error({
        message: 'An error occurred while comparing two hashes : ',
        error,
      });
      throw error;
    }
  }
}
