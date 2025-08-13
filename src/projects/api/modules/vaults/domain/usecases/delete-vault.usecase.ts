import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { VaultsRepository } from '@api/modules/vaults/infra/vaults.repository';
import { DeleteVaultParamsDto } from '@shared/modules/vaults/delete/delete-vault.params.dto';

@injectable()
export class DeleteVaultUseCase
  implements IUseCaseWithInput<DeleteVaultParamsDto, void>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  public async handle(params: DeleteVaultParamsDto): Promise<void> {
    const vaultId: string = params.vaultId;
    await this._vaultsRepository.delete({ uuid: vaultId });
  }
}
