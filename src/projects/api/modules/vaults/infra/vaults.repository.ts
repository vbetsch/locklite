import { injectable } from 'tsyringe';
import { Vault } from '@prisma/client';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import { SharedUuidRecord } from '@api/infra/shared-uuid.record';
import { VaultLabelRecord } from '@api/modules/vaults/infra/records/vault-label.record';
import { CreateVaultRecord } from '@api/modules/vaults/infra/records/create-vault.record';
import { VaultUserIdRecord } from '@api/modules/vaults/infra/records/vault-user-id.record';
import { AddMemberRecord } from '@api/modules/vaults/infra/records/add-member.record';
import { CreateVaultWithMembersRecord } from '@api/modules/vaults/infra/records/create-vault-with-members.record';

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
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
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

  public async createWithMembers(
    record: CreateVaultWithMembersRecord
  ): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.$transaction(async tx => {
        // eslint-disable-next-line @typescript-eslint/typedef
        const vault = await tx.vault.create({
          data: {
            label: record.label,
            secret: record.secret,
          },
        });

        await tx.vaultMember.createMany({
          data: record.userIds.map(userId => ({
            vaultId: vault.uuid,
            userId: userId,
          })),
        });

        return vault;
      })
    );
  }

  public async addMemberToVault(record: AddMemberRecord): Promise<void> {
    await handlePrismaRequest(() =>
      prisma.vaultMember.upsert({
        where: {
          vaultId_userId: {
            vaultId: record.vaultId,
            userId: record.userId,
          },
        },
        update: {},
        create: {
          vaultId: record.vaultId,
          userId: record.userId,
        },
      })
    );
  }

  public async findByLabel(record: VaultLabelRecord): Promise<Vault | null> {
    return await handlePrismaRequest<Vault | null>(() =>
      prisma.vault.findFirst({
        where: { label: record.label },
      })
    );
  }

  public async delete(record: SharedUuidRecord): Promise<void> {
    await handlePrismaRequest<Vault>(() =>
      prisma.vault.delete({ where: { uuid: record.uuid } })
    );
  }
}
