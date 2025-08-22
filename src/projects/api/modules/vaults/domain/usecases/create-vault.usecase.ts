import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import { VaultModelDto } from '@shared/modules/vaults/models/vault.model.dto';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { VaultAlreadyExistsError } from '@api/modules/vaults/app/errors/vault-already-exists.error';
import { User, Vault } from '@prisma/client';
import { RequestedValueTooLongError } from '@api/infra/prisma/errors/requested-value-too-long.error';
import { VaultLabelTooLongError } from '@api/modules/vaults/app/errors/vault-label-too-long.error';

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
    label: string,
    secret: string,
    userEmails: string[]
  ): Promise<Vault> {
    try {
      return await this._vaultsRepository.createWithMembersByEmail({
        label,
        secret,
        userEmails,
      });
    } catch (error: unknown) {
      if (error instanceof RequestedValueTooLongError)
        throw new VaultLabelTooLongError();
      throw error;
    }
  }

  public async handle(input: CreateVaultPayloadDto): Promise<VaultModelDto> {
    const currentUser: User = await this._currentUserService.get();
    await this._testVaultAlreadyExists(input.label);
    const membersEmailsToAdd: string[] = input.members.map(
      member => member.email
    );
    const vaultCreated: Vault = await this._createVaultInDatabase(
      input.label,
      input.secret,
      [...membersEmailsToAdd, currentUser.email]
    );
    return this._vaultAdapter.getDtoFromEntity(vaultCreated);
  }
}
