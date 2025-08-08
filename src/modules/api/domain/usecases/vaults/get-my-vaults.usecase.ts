import type { IUseCase } from '@api/domain/usecases/abstract/usecase.interface';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { VaultAdapter } from '@api/app/adapters/vault.adapter';
import { Vault } from '@prisma/generated';

@injectable()
export class GetMyVaultsUseCase implements IUseCase<VaultModelDto[]> {
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(): Promise<VaultModelDto[]> {
    // TODO: To replace by find by user
    const myVaults: Vault[] = await this._vaultsRepository.findAll();
    return this._vaultAdapter.getDtoListFromEntities(myVaults);
  }
}
