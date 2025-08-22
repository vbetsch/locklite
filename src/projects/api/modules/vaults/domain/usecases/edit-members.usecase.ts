import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { HttpInputDto } from '@shared/dto/input/http-input.dto';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { VaultIncludeMembersResult } from '@api/modules/vaults/infra/results/vault-include-members.result';
import { User } from '@prisma/client';
import { CurrentUserService } from '@api/modules/users/domain/current-user.service';
import { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';

@injectable()
export class EditMembersUseCase
  implements
    IUseCaseWithInput<
      HttpInputDto<ShareVaultParamsDto, ShareVaultPayloadDto>,
      VaultWithMembersModelDto
    >
{
  public constructor(
    @inject(CurrentUserService)
    private readonly _currentUserService: CurrentUserService,
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(
    input: HttpInputDto<ShareVaultParamsDto, ShareVaultPayloadDto>
  ): Promise<VaultWithMembersModelDto> {
    const currentUser: User = await this._currentUserService.get();
    const newMembersEmails: string[] = input.payload.sharedWithMembers.map(
      member => member.email
    );
    const vaultUpdated: VaultIncludeMembersResult =
      await this._vaultsRepository.editMembersById({
        vaultId: input.params.vaultId,
        userEmails: [...newMembersEmails, currentUser.email],
      });
    return this._vaultAdapter.getDtoFromIncludeMembers(vaultUpdated);
  }
}
