import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import prisma from '@lib/prisma';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import { handlePrismaRequest } from '@api/helpers/prisma/handle-prisma-request';

@injectable()
export class VaultsRepository {
  public async findAll(): Promise<Vault[]> {
    return await handlePrismaRequest<Vault[]>(() => prisma.vault.findMany());
  }

  public async countByLabel(label: string): Promise<number> {
    return await handlePrismaRequest<number>(() =>
      prisma.vault.count({
        where: { label },
      })
    );
  }

  public async create(params: CreateVaultRequestDto): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.vault.create({ data: params })
    );
  }

  public async delete(uuid: string): Promise<void> {
    await handlePrismaRequest<Vault>(() =>
      prisma.vault.delete({ where: { uuid: uuid } })
    );
  }
}
