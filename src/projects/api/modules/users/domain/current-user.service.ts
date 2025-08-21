import { injectable, inject } from 'tsyringe';
import { getServerSession, Session } from 'next-auth';
import { UnauthorizedError } from '@api/app/errors/unauthorized.error';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import { authOptions } from '@lib/auth';
import { User } from '@prisma/client';
import { ImpossibleCaseError } from '@api/domain/impossible-case.error';

@injectable()
export class CurrentUserService {
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository
  ) {}

  public async get(): Promise<User> {
    const session: Session | null = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      throw new UnauthorizedError();
    }

    const userFound: User | null = await this._usersRepository.findByEmail({
      email: session.user.email,
    });

    if (!userFound) {
      throw new ImpossibleCaseError();
    }

    return userFound;
  }
}
