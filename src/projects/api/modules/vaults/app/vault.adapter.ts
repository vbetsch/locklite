import { injectable } from 'tsyringe';
import { IAdapter } from '@api/app/adapter.interface';
import { Vault } from '@prisma/client';
import { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { VaultIncludeMembersRecord } from '@api/modules/vaults/infra/records/vault-include-members.record';
import { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

@injectable()
export class VaultAdapter implements IAdapter<Vault, VaultModelDto> {
  public getDtoFromEntity(entity: Vault): VaultModelDto {
    return {
      id: entity.uuid,
      label: entity.label,
      secret: entity.secret,
    };
  }

  public getDtoListFromEntities(entities: Vault[]): VaultModelDto[] {
    return entities.map((entity: Vault) => this.getDtoFromEntity(entity));
  }

  public getDtoFromIncludeMembers(
    result: VaultIncludeMembersRecord
  ): VaultWithMembersModelDto {
    return {
      id: result.uuid,
      label: result.label,
      secret: result.secret,
      members: result.members.map(member => ({
        email: member.user.email,
        name: member.user.name ?? undefined,
      })),
    };
  }

  public getDtoListFromIncludeMembers(
    results: VaultIncludeMembersRecord[]
  ): VaultWithMembersModelDto[] {
    return results.map((result: VaultIncludeMembersRecord) =>
      this.getDtoFromIncludeMembers(result)
    );
  }
}
