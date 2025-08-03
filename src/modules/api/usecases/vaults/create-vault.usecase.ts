import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import { Vault } from '@prisma/generated';
import { VaultAdapter } from '@api/adapters/vault.adapter';
import { VaultsRepository } from '@api/repositories/vaults.repository';
import { CreateVaultRequestDto } from '@shared/dto/input/requests/create-vault.request.dto';
import { VaultAlreadyExistsError } from '@api/errors/business/vaults/vault-already-exists.error';
import { RequestedValueTooLongError } from '@api/errors/http/prisma/requested-value-too-long.error';
import { VaultLabelTooLongError } from '@api/errors/business/vaults/vault-label-too-long.error';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultRequestDto, VaultModelDto>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(input: CreateVaultRequestDto): Promise<VaultModelDto> {
    const vaultsFound: number = await this._vaultsRepository.countByLabel(
      input.label
    );
    if (vaultsFound > 0) {
      throw new VaultAlreadyExistsError(input.label);
    }
    let vaultCreated: Vault;
    try {
      vaultCreated = await this._vaultsRepository.create(input);
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
    }
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
