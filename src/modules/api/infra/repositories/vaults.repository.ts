import { injectable } from 'tsyringe';
import { Vault } from '@prisma/generated';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import { SharedUuidRecord } from '@api/infra/records/shared/shared-uuid.record';
import { VaultLabelRecord } from '@api/infra/records/vaults/vault-label.record';
import { CreateVaultRecord } from '@api/infra/records/vaults/create-vault.record';
import { VaultUserIdRecord } from '@api/infra/records/vaults/vault-user-id.record';
import type { VaultTypeSeed } from '@api/infra/prisma/seed/types/vault.type.seed';
import { CreateManyVaultsRecord } from '@api/infra/records/vaults/create-many-vaults.record';

@injectable()
export class VaultsRepository {
  public async findByUserId(record: VaultUserIdRecord): Promise<Vault[]> {
    return await handlePrismaRequest<Vault[]>(() =>
      prisma.vault.findMany({
        where: {
          userId: record.userId,
        },
        orderBy: { createdAt: 'desc' },
      })
    );
  }

  public async countByLabel(record: VaultLabelRecord): Promise<number> {
    return await handlePrismaRequest<number>(() =>
      prisma.vault.count({
        where: { label: record.label },
      })
    );
  }

  public async create(record: CreateVaultRecord): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.vault.create({ data: record })
    );
  }

  public async createMany(record: CreateManyVaultsRecord): Promise<void> {
    await prisma.vault.createMany({
      data: record.vaults.map((v: VaultTypeSeed) => ({
        label: v.label,
        secret: v.secret,
        userId: record.userId,
      })),
      skipDuplicates: true,
    });
  }

  public async delete(record: SharedUuidRecord): Promise<void> {
    await handlePrismaRequest<Vault>(() =>
      prisma.vault.delete({ where: { uuid: record.uuid } })
    );
  }
}
