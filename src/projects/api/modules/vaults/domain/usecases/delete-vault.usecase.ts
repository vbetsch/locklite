import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { DeleteVaultParamsDto } from '@shared/modules/vaults/endpoints/delete/delete-vault.params.dto';

@injectable()
export class DeleteVaultUseCase
  implements IUseCaseWithInput<DeleteVaultParamsDto, void>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  public async handle(params: DeleteVaultParamsDto): Promise<void> {
    await this._vaultsRepository.delete({ uuid: params.vaultId });
  }
}
