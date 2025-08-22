import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/endpoints/edit-members/edit-members.payload.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { VaultAdapter } from '@api/modules/vaults/app/vault.adapter';

@injectable()
export class EditMembersUseCase
  implements IUseCaseWithInput<EditMembersPayloadDto, VaultWithMembersModelDto>
{
  public constructor(
    @inject(VaultAdapter)
    private readonly _vaultAdapter: VaultAdapter
  ) {}

  public async handle(
    payload: EditMembersPayloadDto
  ): Promise<VaultWithMembersModelDto> {
    return await this._vaultAdapter.getDtoFromIncludeMembers(vaultUpdated);
  }
}
