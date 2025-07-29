import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import type { CreateVaultParamsDto } from '@shared/dto/params/create-vault.params.dto';
import { Vault } from '@prisma/generated';
import { VaultAdapter } from '@api/adapters/vault.adapter';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultParamsDto, VaultModelDto>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(params: CreateVaultParamsDto): Promise<VaultModelDto> {
    const vaultCreated: Vault = await this._vaultsRepository.create(params);
    return this._vaultAdapter.getDtoFromModel(vaultCreated);
  }
}
