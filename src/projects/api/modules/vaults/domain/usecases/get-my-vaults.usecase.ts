import { inject, injectable } from 'tsyringe';
import { IUseCase } from '@api/domain/usecases/usecase.interface';
import { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';
import { User, Vault } from '@prisma/client';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';

@injectable()
export class GetMyVaultsUseCase implements IUseCase<VaultModelDto[]> {
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(CurrentUserService)
    private readonly _currentUserService: CurrentUserService,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(): Promise<VaultModelDto[]> {
    const currentUser: User = await this._currentUserService.get();
    const myVaults: Vault[] = await this._vaultsRepository.findByUserId({
      userId: currentUser.id,
    });
    return this._vaultAdapter.getDtoListFromEntities(myVaults);
  }
}
