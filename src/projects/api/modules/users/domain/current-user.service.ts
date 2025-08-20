import { injectable, inject } from 'tsyringe';
import { getServerSession, Session } from 'next-auth';

@injectable()
export class CurrentUserService {
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository
  ) {}

  public async get(): Promise<UserModel> {
    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      throw new UnauthorizedError();
    }

    const userFound: UserModel | null = await this._usersRepository.findByEmail(
      {
        email: session.user.email,
      }
    );

    if (!userFound) {
      throw new ImpossibleCaseError();
    }

    return userFound;
  }
}
