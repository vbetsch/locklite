import { injectable } from 'tsyringe';
import { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { Vault } from '@prisma/generated';

@injectable()
export class VaultAdapter {
  public getDtoFromModel(model: Vault): VaultModelDto {
    return {
      ...model,
      id: model.id,
      label: model.label,
      secret: model.secret,
    };
  }
}
