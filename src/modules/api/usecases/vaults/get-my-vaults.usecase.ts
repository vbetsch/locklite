import type { IUseCase } from '@api/usecases/abstract/usecase.interface';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { inject } from 'tsyringe';
import { VaultsRepository } from '@api/repositories/vaults.repository';
import { VaultAdapter } from '@api/adapters/vault.adapter';
import { Vault } from '@prisma/generated';

export class GetMyVaultsUseCase implements IUseCase<VaultModelDto[]> {
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(): Promise<VaultModelDto[]> {
    const myVaults: Vault[] = await this._vaultsRepository.findAll();
    return this._vaultAdapter.getDtoListFromModelList(myVaults);
  }
}
