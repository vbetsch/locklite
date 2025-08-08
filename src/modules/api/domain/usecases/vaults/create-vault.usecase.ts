import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { Vault, User as UserModel } from '@prisma/generated';
import { VaultAdapter } from '@api/app/adapters/vault.adapter';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { VaultAlreadyExistsError } from '@api/domain/errors/vaults/vault-already-exists.error';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { VaultLabelTooLongError } from '@api/domain/errors/vaults/vault-label-too-long.error';
import { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@lib/auth';
import { UsersRepository } from '@api/infra/repositories/users.repository';
import { UnauthorizedError } from '@api/app/errors/unauthorized.error';
import { ImpossibleCaseError } from '@api/domain/errors/impossible-case.error';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultPayloadDto, VaultModelDto>
{
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

  private async _testVaultAlreadyExists(label: string): Promise<void> {
    const vaultsFound: number = await this._vaultsRepository.countByLabel({
      label,
    });
    if (vaultsFound > 0) {
      throw new VaultAlreadyExistsError(label);
    }
  }

  private async _createVaultInDatabase(
    input: CreateVaultPayloadDto,
    userId: string
  ): Promise<Vault> {
    try {
      return await this._vaultsRepository.create({
        ...input,
        userId,
      });
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
      throw error;
    }
  }

  public async handle(input: CreateVaultPayloadDto): Promise<VaultModelDto> {
    const currentUser: UserModel = await this._getCurrentUser();
    await this._testVaultAlreadyExists(input.label);
    const vaultCreated: Vault = await this._createVaultInDatabase(
      input,
      currentUser.id
    );
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
