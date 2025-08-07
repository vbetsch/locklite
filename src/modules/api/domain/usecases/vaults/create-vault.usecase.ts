import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { Vault, User } from '@prisma/generated';
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

  public async handle(input: CreateVaultPayloadDto): Promise<VaultModelDto> {
    const session: Session | null = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      throw new UnauthorizedError();
    }
    const userFound: User | null = await this._usersRepository.findByEmail({
      email: session.user.email,
    });
    if (!userFound) {
      throw new ImpossibleCaseError();
    }
    const vaultsFound: number = await this._vaultsRepository.countByLabel({
      label: input.label,
    });
    if (vaultsFound > 0) {
      throw new VaultAlreadyExistsError(input.label);
    }
    let vaultCreated: Vault;
    try {
      vaultCreated = await this._vaultsRepository.create({
        ...input,
        userId: userFound.id,
      });
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
      throw error;
    }
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
