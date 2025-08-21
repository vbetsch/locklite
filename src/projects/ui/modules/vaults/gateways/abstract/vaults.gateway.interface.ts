import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/modules/vaults/endpoints/create/create-vault.data.dto';
import type { DeleteVaultParamsDto } from '@shared/modules/vaults/endpoints/delete/delete-vault.params.dto';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';

export interface IVaultsGateway {
  getMyVaults(): Promise<RequestServiceOutputType<GetMyVaultsDataDto>>;
  createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>>;
  deleteVault(
    input: HttpInputDto<DeleteVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>>;
}
