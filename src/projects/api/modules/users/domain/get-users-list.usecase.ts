import { inject, injectable } from 'tsyringe';
import { IUseCase } from '@api/domain/usecases/usecase.interface';
import { UserModelDto } from '@shared/modules/users/user.model.dto';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import { User } from '@prisma/client';
import { UserAdapter } from '@api/modules/users/app/user.adapter';

@injectable()
export class GetUsersListUseCase implements IUseCase<UserModelDto[]> {
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(UserAdapter)
    private readonly _userAdapter: UserAdapter
  ) {}

  public async handle(): Promise<UserModelDto[]> {
    const allUsers: User[] = await this._usersRepository.getAllUsers();
    return this._userAdapter.getDtoListFromEntities(allUsers);
  }
}
