import { injectable } from 'tsyringe';
import { IAdapter } from '@api/app/adapter.interface';
import { Vault } from '@prisma/client';
import { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { VaultIncludeMembersResult } from '@api/modules/vaults/infra/results/vault-include-members.result';
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
    result: VaultIncludeMembersResult
  ): VaultWithMembersModelDto {
    return {
      id: result.uuid,
      label: result.label,
      secret: result.secret,
      members: result.members.map(member => ({
        email: member.email,
        name: member.name,
      })),
    };
  }

  public getDtoListFromIncludeMembers(
    results: VaultIncludeMembersResult[]
  ): VaultWithMembersModelDto[] {
    return results.map((result: VaultIncludeMembersResult) =>
      this.getDtoFromIncludeMembers(result)
    );
  }
}
