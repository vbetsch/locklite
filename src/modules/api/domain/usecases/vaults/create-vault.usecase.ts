import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { Vault } from '@prisma/generated';
import { VaultAdapter } from '@api/app/adapters/vault.adapter';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { VaultAlreadyExistsError } from '@api/domain/errors/vaults/vault-already-exists.error';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { VaultLabelTooLongError } from '@api/domain/errors/vaults/vault-label-too-long.error';
import { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultPayloadDto, VaultModelDto>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(input: CreateVaultPayloadDto): Promise<VaultModelDto> {
    const vaultsFound: number = await this._vaultsRepository.countByLabel({
      label: input.label,
    });
    if (vaultsFound > 0) {
      throw new VaultAlreadyExistsError(input.label);
    }
    let vaultCreated: Vault;
    try {
      // TODO: set real user id
      vaultCreated = await this._vaultsRepository.create({
        ...input,
        userId: '',
      });
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
      throw error;
    }
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
