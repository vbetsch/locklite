import { injectable } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import type { CreateVaultParamsDto } from '@shared/dto/params/create-vault.params.dto';

@injectable()
export class CreateVaultUseCase
  implements IUseCaseWithInput<CreateVaultParamsDto, VaultModelDto>
{
  public async handle(params: CreateVaultParamsDto): Promise<VaultModelDto> {}
}
