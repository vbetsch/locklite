import { inject, injectable } from 'tsyringe';

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
