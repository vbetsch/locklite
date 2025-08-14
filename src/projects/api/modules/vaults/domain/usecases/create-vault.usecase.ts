import { inject, injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { Vault, User as UserModel } from '@prisma/generated';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { VaultAlreadyExistsError } from '@api/modules/vaults/app/errors/vault-already-exists.error';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { VaultLabelTooLongError } from '@api/modules/vaults/app/errors/vault-label-too-long.error';
import { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';
import { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultPayloadDto, VaultModelDto>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(CurrentUserService)
    private readonly _currentUserService: CurrentUserService,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

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

  public async handle(
    input: CreateVaultPayloadDto
  ): Promise<VaultWithMembersModelDto> {
    const currentUser: UserModel = await this._currentUserService.get();
    await this._testVaultAlreadyExists(input.label);
    const vaultCreated: Vault = await this._createVaultInDatabase(
      input,
      currentUser.id
    );
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
