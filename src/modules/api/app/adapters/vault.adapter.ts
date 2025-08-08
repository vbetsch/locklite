import { injectable } from 'tsyringe';
import { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { Vault } from '@prisma/generated';
import { IAdapter } from '@api/app/adapters/abstract/adapter.interface';

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
}
