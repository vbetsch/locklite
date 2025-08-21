import { injectable } from 'tsyringe';
import { Vault } from '@prisma/client';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import { SharedUuidRecord } from '@api/infra/shared-uuid.record';
import { VaultLabelRecord } from '@api/modules/vaults/infra/records/vault-label.record';
import { CreateVaultRecord } from '@api/modules/vaults/infra/records/create-vault.record';
import { VaultUserIdRecord } from '@api/modules/vaults/infra/records/vault-user-id.record';
import type { VaultTypeSeed } from '@api/modules/seed/app/types/vault.type.seed';

@injectable()
export class VaultsRepository {
  public async findByUserId(record: VaultUserIdRecord): Promise<Vault[]> {
    return await handlePrismaRequest<Vault[]>(() =>
      prisma.vault.findMany({
        where: {
          members: {
            some: {
              userId: record.userId,
            },
          },
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

  public async createWithMember(
    vault: VaultTypeSeed,
    userId: string
  ): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.vault.create({
        data: {
          label: vault.label,
          secret: vault.secret,
          members: {
            create: {
              userId: userId,
            },
          },
        },
      })
    );
  }

  public async addMemberToVault(
    vaultId: string,
    userId: string
  ): Promise<void> {
    await handlePrismaRequest(() =>
      prisma.vaultMember.create({
        data: {
          vaultId: vaultId,
          userId: userId,
        },
      })
    );
  }

  public async findByLabel(label: string): Promise<Vault | null> {
    return await handlePrismaRequest<Vault | null>(() =>
      prisma.vault.findFirst({
        where: { label },
      })
    );
  }

  public async delete(record: SharedUuidRecord): Promise<void> {
    await handlePrismaRequest<Vault>(() =>
      prisma.vault.delete({ where: { uuid: record.uuid } })
    );
  }
}
