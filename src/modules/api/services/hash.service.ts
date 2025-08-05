import { injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ApiLogger } from '@api/logs/api.logger';

@injectable()
export class HashService {
  private readonly _salt: number = parseInt(
    process.env.BCRYPT_SALT_ROUNDS || '10',
    10
  );

  private async _hashString(str: string): Promise<string> {
    return await hash(str, this._salt);
  }

  public async hash(str: string): Promise<string> {
    try {
      return await this._hashString(str);
    } catch (error: unknown) {
      ApiLogger.error('An error occurred while hashing : ', error);
      throw error;
    }
  }
}
