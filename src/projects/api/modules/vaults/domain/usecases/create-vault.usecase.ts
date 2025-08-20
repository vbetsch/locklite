import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultPayloadDto, VaultModelDto>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(CurrentUserService)
    private readonly _currentUserService: CurrentUserService,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  private async _testVaultAlreadyExists(label: string): Promise<void> {
    const vaultsFound: number = await this._vaultsRepository.countByLabel({
      label,
    });
    if (vaultsFound > 0) {
      throw new VaultAlreadyExistsError(label);
    }
  }

  private async _createVaultInDatabase(
    input: CreateVaultPayloadDto,
    userId: string
  ): Promise<Vault> {
    try {
      return await this._vaultsRepository.create({
        ...input,
        userId,
      });
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
      throw error;
    }
  }

  public async handle(
    input: CreateVaultPayloadDto
  ): Promise<VaultWithMembersModelDto> {
    const currentUser: UserModel = await this._currentUserService.get();
    await this._testVaultAlreadyExists(input.label);
    const vaultCreated: Vault = await this._createVaultInDatabase(
      input,
      currentUser.id
    );
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
