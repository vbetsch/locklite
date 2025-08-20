import { inject, injectable } from 'tsyringe';

@injectable()
export class SignInUseCase
  implements IUseCaseWithInput<SignInPayloadDto | null, UserModelDto | null>
{
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(HashService)
    private readonly _hashService: HashService,
    @inject(UserAdapter)
    private readonly _userAdapter: UserAdapter
  ) {}

  public async handle(
    input: SignInPayloadDto | null
  ): Promise<UserModelDto | null> {
    if (!input) return null;

    const userFound: User | null = await this._usersRepository.findByEmail({
      email: input.email,
    });
    if (!userFound) return null;

    const credentialsAreValid: boolean = await this._hashService.compare(
      input.password,
      userFound.password
    );
    if (!credentialsAreValid) return null;

    return this._userAdapter.getDtoFromEntity(userFound);
  }
}
