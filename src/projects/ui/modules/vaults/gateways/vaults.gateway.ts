import { inject, injectable } from 'tsyringe';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';
import { CreateVaultDataDto } from '@shared/modules/vaults/endpoints/create/create-vault.data.dto';
import { GetMyVaultsDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.data.dto';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { DeleteVaultParamsDto } from '@shared/modules/vaults/endpoints/delete/delete-vault.params.dto';
import { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import { GetMyVaultsWithMembersDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.with-members.data.dto';
import { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';
import { ShareVaultDataDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.data.dto';

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
    input: HttpInputDto<DeleteVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>> {
    return await this._lockliteRequestService.delete<number>(
      '/vaults/' + input.params.vaultId
    );
  }

  public async getMyVaultsWithMembers(): Promise<
    RequestServiceOutputType<GetMyVaultsWithMembersDataDto>
  > {
    return await this._lockliteRequestService.get<GetMyVaultsWithMembersDataDto>(
      '/vaults'
    );
  }

  public async editVaultMembers(input: {
    params: ShareVaultParamsDto;
    payload: ShareVaultPayloadDto;
  }): Promise<RequestServiceOutputType<ShareVaultDataDto>> {
    return await this._lockliteRequestService.put<ShareVaultDataDto>(
      '/vaults/' + input.params.vaultId + '/members',
      input.payload
    );
  }
}
