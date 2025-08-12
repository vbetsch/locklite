import { injectable } from 'tsyringe';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import { User } from '@prisma/generated';
import prisma from '@lib/prisma';
import { UserEmailRecord } from '@api/modules/users/infra/records/user-email.record';
import { CreateUserRecord } from '@api/modules/users/infra/records/create-user.record';

@injectable()
export class UsersRepository {
  public async findByEmail(record: UserEmailRecord): Promise<User | null> {
    return await handlePrismaRequest<User | null>(() =>
      prisma.user.findUnique({
        where: { email: record.email },
      })
    );
  }

  public async create(record: CreateUserRecord): Promise<User> {
    return await handlePrismaRequest<User>(() =>
      prisma.user.create({ data: record })
    );
  }

  public async createOrUpdate(record: CreateUserRecord): Promise<User> {
    return await prisma.user.upsert({
      where: { email: record.email },
      update: {
        name: record.name,
        password: record.password,
      },
      create: {
        name: record.name,
        email: record.email,
        password: record.password,
      },
    });
  }
}
