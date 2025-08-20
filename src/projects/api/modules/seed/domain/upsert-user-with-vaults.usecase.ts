import { inject, injectable } from 'tsyringe';

@injectable()
export class UpsertUserWithVaultsUseCase
  implements IUseCaseWithInput<UserTypeSeed, User>
{
  public constructor(
    @inject(HashService)
    private readonly _hashService: HashService,
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  private async _createUser(input: UserTypeSeed): Promise<User> {
    const passwordHash: string = await this._hashService.hash(
      input.passwordPlain
    );

    return await this._usersRepository.createOrUpdate({
      email: input.email,
      name: input.name || undefined,
      password: passwordHash,
    });
  }

  private async _createVaults(
    user: User,
    vaults: ReadonlyArray<VaultTypeSeed>
  ): Promise<void> {
    const existingVaults: ReadonlyArray<Vault> =
      await this._vaultsRepository.findByUserId({
        userId: user.id,
      });

    if (existingVaults.length === 0) {
      await this._vaultsRepository.createMany({
        userId: user.id,
        vaults: vaults,
      });
    }
  }

  public async handle(input: UserTypeSeed): Promise<User> {
    const user: User = await this._createUser(input);
    await this._createVaults(user, input.vaults);
    return user;
  }
}
