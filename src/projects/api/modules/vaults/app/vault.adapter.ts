import { injectable } from 'tsyringe';
import { IAdapter } from '@api/app/adapter.interface';
import { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { Vault } from '@prisma/client';

@injectable()
export class VaultAdapter implements IAdapter<Vault, VaultWithMembersModelDto> {
  public getDtoFromEntity(entity: Vault): VaultWithMembersModelDto {
    return {
      id: entity.uuid,
      label: entity.label,
      secret: entity.secret,
      members: entity.members,
    };
  }

  public getDtoListFromEntities(entities: Vault[]): VaultWithMembersModelDto[] {
    return entities.map((entity: Vault) => this.getDtoFromEntity(entity));
  }
}
