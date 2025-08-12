import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/vaults/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/dto/output/data/vaults/create-vault.data.dto';
import type { CreateVaultParamsDto } from '@shared/dto/input/params/create-vault.params.dto';
import type { HttpInputDto } from '@shared/dto/input/abstract/http-input.dto';

export interface IVaultsGateway {
  getMyVaults(): Promise<RequestServiceOutputType<GetMyVaultsDataDto>>;
  createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>>;
  deleteVault(
    input: HttpInputDto<CreateVaultParamsDto>
  ): Promise<RequestServiceOutputType<number>>;
}
