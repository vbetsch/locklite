import { inject, injectable } from 'tsyringe';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';
import { CreateVaultRequestDto } from '@shared/dto/input/requests/create-vault.request.dto';
import { CreateVaultDataDto } from '@shared/dto/output/data/create-vault.data.dto';
import { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

@injectable()
export class VaultsGateway {
  public constructor(
    @inject(LockliteApiRequestService)
    private readonly _lockliteRequestService: LockliteApiRequestService
  ) {}

  public async getMyVaults(): Promise<
    RequestServiceOutputType<GetMyVaultsDataDto>
  > {
    return await this._lockliteRequestService.get<GetMyVaultsDataDto>(
      '/vaults'
    );
  }

  public async createVault(
    data: CreateVaultRequestDto
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await this._lockliteRequestService.post<CreateVaultDataDto>(
      '/vaults',
      data
    );
  }

  public async deleteVault(
    id: string
  ): Promise<RequestServiceOutputType<number>> {
    return await this._lockliteRequestService.delete<number>('/vaults/' + id);
  }
}
