import type { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import type { UserTypeSeed } from '@api/infra/prisma/seed/types/user.type.seed';
import type { User, Vault } from '@prisma/generated';
import { inject, injectable } from 'tsyringe';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { HashService } from '@api/domain/services/hash.service';
import { UsersRepository } from '@api/infra/repositories/users.repository';

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

  public async handle(input: UserTypeSeed): Promise<User> {
    const passwordHash: string = await this._hashService.hash(
      input.passwordPlain
    );

    const user: User = await this._usersRepository.createOrUpdate({
      email: input.email,
      // eslint-disable-next-line no-undefined
      name: input.name || undefined,
      password: passwordHash,
    });

    const existingVaults: ReadonlyArray<Vault> =
      await this._vaultsRepository.findByUserId({
        userId: user.id,
      });

    if (existingVaults.length === 0) {
      await this._vaultsRepository.createMany({
        userId: user.id,
        vaults: input.vaults,
      });
    }

    return user;
  }
}
