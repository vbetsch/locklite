import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.payload.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { EditMembersParamsDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.params.dto';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { VaultIncludeMembersResult } from '@api/modules/vaults/infra/results/vault-include-members.result';

@injectable()
export class EditMembersUseCase
  implements
    IUseCaseWithInput<
      HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>,
      VaultWithMembersModelDto
    >
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository,
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(
    input: HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>
  ): Promise<VaultWithMembersModelDto> {
    const vaultUpdated: VaultIncludeMembersResult =
      await this._vaultsRepository.editMembersById({
        vaultId: input.params.vaultId,
        newMembers: input.payload.members,
      });
    return this._vaultAdapter.getDtoFromIncludeMembers(vaultUpdated);
  }
}
