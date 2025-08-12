import type { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import type { UserTypeSeed } from '@api/modules/seed/app/types/user.type.seed';
import type { User, Vault } from '@prisma/generated';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { HashService } from '@api/modules/auth/domain/hash.service';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import type { VaultTypeSeed } from '@api/modules/seed/app/types/vault.type.seed';

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
      // eslint-disable-next-line no-undefined
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
