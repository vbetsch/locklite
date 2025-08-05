import { injectable } from 'tsyringe';
import { compare, hash } from 'bcrypt';
import { ApiLogger } from '@api/logs/api.logger';

@injectable()
export class HashService {
  private readonly _salt: number = parseInt(
    process.env.BCRYPT_SALT_ROUNDS || '10',
    10
  );

  private async _hashString(str: string | Buffer): Promise<string> {
    return await hash(str, this._salt);
  }

  private async _compareTwoHash(str: string, ref: string): Promise<boolean> {
    return await compare(str, ref);
  }

  public async hash(str: string): Promise<string> {
    try {
      return await this._hashString(str);
    } catch (error: unknown) {
      ApiLogger.error('An error occurred while hashing string : ', error);
      throw error;
    }
  }

  public async compare(
    hashedInput: string,
    refValue: string
  ): Promise<boolean> {
    try {
      return await this._compareTwoHash(hashedInput, refValue);
    } catch (error: unknown) {
      ApiLogger.error('An error occurred while compare two hash : ', error);
      throw error;
    }
  }
}
