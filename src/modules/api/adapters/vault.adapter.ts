import { injectable } from 'tsyringe';
import { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { Vault } from '@prisma/generated';
import { IAdapter } from '@api/adapters/abstract/adapter.interface';

@injectable()
export class VaultAdapter implements IAdapter<Vault, VaultModelDto> {
  public getDtoFromModel(model: Vault): VaultModelDto {
    return {
      ...model,
      id: model.id,
      label: model.label,
      secret: model.secret,
    };
  }
}
