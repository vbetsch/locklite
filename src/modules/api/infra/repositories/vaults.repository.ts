import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';
import prisma from '@lib/prisma';

@injectable()
export class VaultsRepository {
  public async findAll(): Promise<Vault[]> {
    return await handlePrismaRequest<Vault[]>(() =>
      prisma.vault.findMany({
        orderBy: { createdAt: 'desc' },
      })
    );
  }

  public async countByLabel(label: string): Promise<number> {
    return await handlePrismaRequest<number>(() =>
      prisma.vault.count({
        where: { label },
      })
    );
  }

  public async create(payload: CreateVaultPayloadDto): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.vault.create({ data: payload })
    );
  }

  public async delete(uuid: string): Promise<void> {
    await handlePrismaRequest<Vault>(() =>
      prisma.vault.delete({ where: { uuid: uuid } })
    );
  }
}
