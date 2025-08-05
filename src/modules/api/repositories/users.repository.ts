import { injectable } from 'tsyringe';
import { handlePrismaRequest } from '@api/helpers/prisma/handle-prisma-request';
import { User } from '@prisma/generated';
import prisma from '@lib/prisma';
import type { RegisterPayloadDto } from '@shared/dto/input/payloads/register.payload.dto';

@injectable()
export class UsersRepository {
  public async create(payload: RegisterPayloadDto): Promise<User> {
    return await handlePrismaRequest<User>(() =>
      prisma.user.create({ data: payload })
    );
  }
}
