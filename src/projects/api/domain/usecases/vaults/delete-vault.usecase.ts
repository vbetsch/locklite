import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { CreateVaultParamsDto } from '@shared/modules/vaults/create/create-vault.params.dto';

@injectable()
export class DeleteVaultUseCase
  implements IUseCaseWithInput<CreateVaultParamsDto, void>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  public async handle(params: CreateVaultParamsDto): Promise<void> {
    const vaultId: string = params.id;
    await this._vaultsRepository.delete({ uuid: vaultId });
  }
}
