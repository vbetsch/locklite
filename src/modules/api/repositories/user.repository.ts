import prisma from '@lib/prisma';
import { MasterAccount } from '@prisma/generated';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository {
  public async getAll(): Promise<MasterAccount[]> {
    return await prisma.masterAccount.findMany();
  }
}
