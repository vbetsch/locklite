import { inject, injectable } from 'tsyringe';
import { IUseCase } from '@api/domain/usecases/usecase.interface';
import { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';
import { User } from '@prisma/client';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { VaultIncludeMembersResult } from '@api/modules/vaults/infra/results/vault-include-members.result';

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

  public async handle(): Promise<VaultWithMembersModelDto[]> {
    const currentUser: User = await this._currentUserService.get();
    const myVaults: VaultIncludeMembersResult[] =
      await this._vaultsRepository.findByUserId({
        userId: currentUser.id,
      });
    return this._vaultAdapter.getDtoListFromIncludeMembers(myVaults);
  }
}
