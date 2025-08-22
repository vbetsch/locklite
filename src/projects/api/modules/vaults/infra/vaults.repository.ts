import { injectable } from 'tsyringe';
import { Vault } from '@prisma/client';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import { SharedUuidRecord } from '@api/infra/shared-uuid.record';
import { VaultLabelRecord } from '@api/modules/vaults/infra/records/vault-label.record';
import { VaultUserIdRecord } from '@api/modules/vaults/infra/records/vault-user-id.record';
import { AddMemberRecord } from '@api/modules/vaults/infra/records/add-member.record';
import { CreateVaultWithMembersRecord } from '@api/modules/vaults/infra/records/create-vault-with-members.record';
import { VaultIncludeMembersRecord } from '@api/modules/vaults/infra/records/vault-include-members.record';
import { CreateVaultWithMembersByEmailRecord } from '@api/modules/vaults/infra/records/create-vault-with-members-by-email.record';
import { EditMembersRecord } from '@api/modules/vaults/infra/records/edit-members.record';
import { TxType } from '@api/infra/prisma/tx.type';
import { VaultMemberWithUserRecord } from '@api/modules/vaults/infra/records/vault-member-with-user.record';
import { UserSelectRecord } from '@api/modules/vaults/infra/records/user-select.record';
import { VaultNotFoundError } from '@api/modules/vaults/app/errors/vault-not-found.error';
import { UsersNotFoundError } from '@api/modules/users/app/errors/users-not-found.error';

@injectable()
export class VaultsRepository {
  public async findByUserId(
    record: VaultUserIdRecord
  ): Promise<VaultIncludeMembersRecord[]> {
    return await handlePrismaRequest<VaultIncludeMembersRecord[]>(() =>
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

  public async createWithMembers(
    record: CreateVaultWithMembersRecord
  ): Promise<Vault> {
    return await handlePrismaRequest<Vault>(() =>
      prisma.$transaction(async tx => {
        const vault: Vault = await tx.vault.create({
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

  public async createWithMembersByEmail(
    record: CreateVaultWithMembersByEmailRecord
  ): Promise<VaultIncludeMembersRecord> {
    return await handlePrismaRequest<VaultIncludeMembersRecord>(() =>
      prisma.$transaction(async tx => {
        const vault: Vault = await this.createVault(tx, record);
        const users: UserSelectRecord[] = await this.findUsersByEmails(
          tx,
          record.userEmails
        );

        this.validateAllUsersExist(users, record.userEmails);

        const createdMembers: VaultMemberWithUserRecord[] =
          await this.createVaultMembers(tx, vault.uuid, users);

        return {
          ...vault,
          members: createdMembers,
        };
      })
    );
  }

  public async editMembersById(
    record: EditMembersRecord
  ): Promise<VaultIncludeMembersRecord> {
    return await handlePrismaRequest<VaultIncludeMembersRecord>(() =>
      prisma.$transaction(async tx => {
        const vault: Vault = await this.findVaultById(tx, record.vaultId);
        const users: UserSelectRecord[] = await this.findUsersByEmails(
          tx,
          record.userEmails
        );

        this.validateAllUsersExist(users, record.userEmails);

        await this.deleteAllVaultMembers(tx, record.vaultId);
        const createdMembers: VaultMemberWithUserRecord[] =
          await this.createVaultMembers(tx, record.vaultId, users);

        return {
          ...vault,
          members: createdMembers,
        };
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

  private createVault(
    tx: TxType,
    record: CreateVaultWithMembersByEmailRecord
  ): Promise<Vault> {
    return tx.vault.create({
      data: {
        label: record.label,
        secret: record.secret,
      },
    });
  }

  private findUsersByEmails(
    tx: TxType,
    userEmails: string[]
  ): Promise<UserSelectRecord[]> {
    return tx.user.findMany({
      where: {
        email: {
          in: userEmails,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  private validateAllUsersExist(
    users: UserSelectRecord[],
    userEmails: string[]
  ): void {
    if (users.length !== userEmails.length) {
      const foundEmails: string[] = users.map(user => user.email);
      const missingEmails: string[] = userEmails.filter(
        email => !foundEmails.includes(email)
      );
      throw new UsersNotFoundError(missingEmails);
    }
  }

  private async findVaultById(tx: TxType, vaultId: string): Promise<Vault> {
    const vault: Vault | null = await tx.vault.findUnique({
      where: { uuid: vaultId },
    });

    if (!vault) {
      throw new VaultNotFoundError(vaultId);
    }

    return vault;
  }

  private async deleteAllVaultMembers(
    tx: TxType,
    vaultId: string
  ): Promise<void> {
    await tx.vaultMember.deleteMany({
      where: {
        vaultId: vaultId,
      },
    });
  }

  private async createVaultMembers(
    tx: TxType,
    vaultId: string,
    users: UserSelectRecord[]
  ): Promise<VaultMemberWithUserRecord[]> {
    return await Promise.all(
      users.map(async user => {
        const member: {
          uuid: string;
          vaultId: string;
          userId: string;
        } = await tx.vaultMember.create({
          data: {
            vaultId: vaultId,
            userId: user.id,
          },
        });
        return {
          uuid: member.uuid,
          vaultId: member.vaultId,
          userId: member.userId,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      })
    );
  }
}
