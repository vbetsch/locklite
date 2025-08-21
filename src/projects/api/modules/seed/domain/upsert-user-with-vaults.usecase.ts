import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { UserTypeSeed } from '@api/modules/seed/app/types/user.type.seed';
import { User, Vault } from '@prisma/client';
import { HashService } from '@api/modules/auth/domain/hash.service';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { VaultTypeSeed } from '@api/modules/seed/app/types/vault.type.seed';

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

  private async _createOrShareVaults(
    user: User,
    vaults: ReadonlyArray<VaultTypeSeed>
  ): Promise<void> {
    const existingUserVaults: ReadonlyArray<Vault> =
      await this._vaultsRepository.findByUserId({
        userId: user.id,
      });

    if (existingUserVaults.length > 0) {
      return;
    }

    for (const vaultData of vaults) {
      const existingVault: Vault | null =
        await this._vaultsRepository.findByLabel({
          label: vaultData.label,
        });

      if (existingVault) {
        await this._vaultsRepository.addMemberToVault({
          vaultId: existingVault.uuid,
          userId: user.id,
        });
      } else {
        await this._vaultsRepository.createWithMembers({
          label: vaultData.label,
          secret: vaultData.secret,
          userIds: [user.id],
        });
      }
    }
  }

  public async handle(input: UserTypeSeed): Promise<User> {
    const user: User = await this._createUser(input);
    await this._createOrShareVaults(user, input.vaults);
    return user;
  }
}
