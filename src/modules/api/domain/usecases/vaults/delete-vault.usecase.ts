import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';
import { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';

@injectable()
export class DeleteVaultUseCase
  implements IUseCaseWithInput<CreateVaultParams, void>
{
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  public async handle(params: CreateVaultParams): Promise<void> {
    const vaultId: string = params.id;
    await this._vaultsRepository.delete(vaultId);
  }
}
