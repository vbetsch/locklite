import { inject, injectable } from 'tsyringe';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import { CreateVaultDataDto } from '@shared/dto/data/create-vault.data.dto';
import { GetMyVaultsDataDto } from '@shared/dto/data/get-my-vaults.data.dto';

@injectable()
export class VaultsGateway {
  public constructor(
    @inject(LockliteApiRequestService)
    private readonly _lockliteRequestService: LockliteApiRequestService
  ) {}

  public async getMyVaults(): Promise<GetMyVaultsDataDto> {
    return await this._lockliteRequestService.get<GetMyVaultsDataDto>(
      '/vaults'
    );
  }

  public async createVault(
    data: CreateVaultRequestDto
  ): Promise<CreateVaultDataDto> {
    return await this._lockliteRequestService.post<CreateVaultDataDto>(
      '/vaults',
      data
    );
  }

  public async deleteVault(id: string): Promise<void> {
    await this._lockliteRequestService.delete('/vaults/' + id);
  }
}
