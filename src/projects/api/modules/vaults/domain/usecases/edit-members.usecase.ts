import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.payload.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';
import { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { EditMembersParamsDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.params.dto';

@injectable()
export class EditMembersUseCase
  implements
    IUseCaseWithInput<
      HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>,
      VaultWithMembersModelDto
    >
{
  public constructor(
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(
    input: HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>
  ): Promise<VaultWithMembersModelDto> {
    return await this._vaultAdapter.getDtoFromIncludeMembers(vaultUpdated);
  }
}
