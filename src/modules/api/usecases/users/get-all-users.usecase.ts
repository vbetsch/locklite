import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UserAdapter } from '@api/adapters/user.adapter';
import { UserRepository } from '@api/repositories/user.repository';
import { MasterAccount } from '@prisma/generated';
import { UsersNotFoundError } from '@api/errors/users-not-found.error';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllUsersUseCase {
  public constructor(
    @inject(UserRepository) private readonly _userRepository: UserRepository,
    @inject(UserAdapter) private readonly _userAdapter: UserAdapter
  ) {}

  public async handle(): Promise<UserModelDto[]> {
    let masterAccounts: MasterAccount[] | null = null;
    try {
      masterAccounts = await this._userRepository.getAll();
    } catch (error) {
      console.error(error);
    }
    if (!masterAccounts || masterAccounts.length === 0) {
      throw new UsersNotFoundError();
    }
    return this._userAdapter.getUsersFromMasterAccounts(masterAccounts);
  }
}
