import type { IUseCase } from '@api/domain/usecases/usecase.interface';
import type { VaultModelDto } from '@shared/modules/vaults/vault.model.dto';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { Vault, User } from '@prisma/generated';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';

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
