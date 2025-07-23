import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UserAdapter } from '@api/adapters/user.adapter';
import { UserRepository } from '@api/repositories/user.repository';
import { MasterAccount } from '@prisma/generated';
import { UsersNotFoundError } from '@api/errors/users-not-found.error';

export class GetAllUsersUseCase {
  public static async handle(): Promise<UserModelDto[]> {
    let masterAccounts: MasterAccount[] | null = null;
    try {
      masterAccounts = await UserRepository.getAll();
    } catch (error) {
      console.error(error);
    }
    if (!masterAccounts || masterAccounts.length === 0) {
      throw new UsersNotFoundError();
    }
    return UserAdapter.getUsersFromMasterAccounts(masterAccounts);
  }
}
