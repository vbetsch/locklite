import { inject, injectable } from 'tsyringe';
import { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';
import { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import { CreateVaultResponseDto } from '@shared/dto/responses/create-vault.response.dto';

@injectable()
export class VaultsGateway {
  public constructor(
    @inject(LockliteApiRequestService)
    private readonly _lockliteRequestService: LockliteApiRequestService
  ) {}

  public async getMyVaults(): Promise<GetMyVaultsResponseDto> {
    return await this._lockliteRequestService.get<GetMyVaultsResponseDto>(
      '/vaults'
    );
  }

  public async createVault(
    data: CreateVaultRequestDto
  ): Promise<CreateVaultResponseDto> {
    return await this._lockliteRequestService.post<CreateVaultResponseDto>(
      '/vaults',
      data
    );
  }

  public async deleteVault(id: string): Promise<void> {
    await this._lockliteRequestService.delete('/vaults/' + id);
  }
}
