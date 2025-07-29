import { injectable } from 'tsyringe';
import { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { Vault } from '@prisma/generated';
import { IAdapter } from '@api/adapters/abstract/adapter.interface';

@injectable()
export class VaultAdapter implements IAdapter<Vault, VaultModelDto> {
  public getDtoFromModel(model: Vault): VaultModelDto {
    return {
      ...model,
    };
  }

  public getDtoListFromModelList(models: Vault[]): VaultModelDto[] {
    return models.map((model: Vault) => this.getDtoFromModel(model));
  }
}
