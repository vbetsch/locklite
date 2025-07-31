import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import { Vault } from '@prisma/generated';
import { VaultAdapter } from '@api/adapters/vault.adapter';
import { VaultsRepository } from '@api/repositories/vaults.repository';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';

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
    const vaultCreated: Vault = await this._vaultsRepository.create(input);
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
