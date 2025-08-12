import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/create/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/modules/vaults/create/create-vault.data.dto';
import type { CreateVaultParamsDto } from '@shared/modules/vaults/create/create-vault.params.dto';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';

export interface IVaultsGateway {
  getMyVaults(): Promise<RequestServiceOutputType<GetMyVaultsDataDto>>;
  createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>>;
  deleteVault(
    input: HttpInputDto<CreateVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>>;
}
