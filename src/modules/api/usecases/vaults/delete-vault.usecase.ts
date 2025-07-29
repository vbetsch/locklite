import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import { IdParam } from '@shared/dto/params/id.param';
import { VaultsRepository } from '@api/repositories/vaults.repository';

@injectable()
export class DeleteVaultUseCase implements IUseCaseWithInput<IdParam, void> {
  public constructor(
    @inject(VaultsRepository)
    private readonly _vaultsRepository: VaultsRepository
  ) {}

  public async handle(input: IdParam): Promise<void> {
    const vaultId: string = (await input.params)?.id;
    await this._vaultsRepository.delete(vaultId);
  }
}
