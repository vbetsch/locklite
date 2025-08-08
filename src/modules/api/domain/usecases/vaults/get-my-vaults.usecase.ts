import type { IUseCase } from '@api/domain/usecases/abstract/usecase.interface';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { VaultAdapter } from '@api/app/adapters/vault.adapter';
import { Vault, User as UserModel } from '@prisma/generated';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@lib/auth';
import { UnauthorizedError } from '@api/app/errors/unauthorized.error';
import { ImpossibleCaseError } from '@api/domain/errors/impossible-case.error';
import { UsersRepository } from '@api/infra/repositories/users.repository';

@injectable()
export class GetMyVaultsUseCase implements IUseCase<VaultModelDto[]> {
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  private async _getCurrentUser(): Promise<UserModel> {
    const session: Session | null = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
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

  public async handle(): Promise<VaultModelDto[]> {
    const currentUser: UserModel = await this._getCurrentUser();
    const myVaults: Vault[] = await this._vaultsRepository.findByUserId({
      userId: currentUser.id,
    });
    return this._vaultAdapter.getDtoListFromEntities(myVaults);
  }
}
