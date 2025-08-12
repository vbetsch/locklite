import { inject, injectable } from 'tsyringe';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';
import { CreateVaultDataDto } from '@shared/dto/output/data/vaults/create-vault.data.dto';
import { GetMyVaultsDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.data.dto';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { CreateVaultParamsDto } from '@shared/dto/input/params/create-vault.params.dto';
import { CreateVaultPayloadDto } from '@shared/dto/input/payloads/vaults/create-vault.payload.dto';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { HttpInputDto } from '@shared/dto/input/abstract/http-input.dto';

@injectable()
export class VaultsGateway implements IVaultsGateway {
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
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await this._lockliteRequestService.post<CreateVaultDataDto>(
      '/vaults',
      input.payload
    );
  }

  public async deleteVault(
    input: HttpInputDto<CreateVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>> {
    return await this._lockliteRequestService.delete<number>(
      '/vaults/' + input.params.id
    );
  }
}
