import type { IUseCase } from '@api/domain/usecases/abstract/usecase.interface';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { VaultAdapter } from '@api/app/adapters/vault.adapter';
import { Vault, User } from '@prisma/client';
import { CurrentUserService } from '@api/domain/services/current-user.service';

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
