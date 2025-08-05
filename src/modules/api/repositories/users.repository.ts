import { injectable } from 'tsyringe';
import { handlePrismaRequest } from '@api/helpers/prisma/handle-prisma-request';
import { User } from '@prisma/generated';
import prisma from '@lib/prisma';
import type { RegisterPayloadDto } from '@shared/dto/input/payloads/register.payload.dto';

@injectable()
export class UsersRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return await handlePrismaRequest<User | null>(() =>
      prisma.user.findUnique({
        where: { email },
      })
    );
  }

  public async create(payload: RegisterPayloadDto): Promise<User> {
    return await handlePrismaRequest<User>(() =>
      prisma.user.create({ data: payload })
    );
  }
}
