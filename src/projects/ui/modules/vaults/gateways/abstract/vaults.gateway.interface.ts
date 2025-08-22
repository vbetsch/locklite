import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/modules/vaults/endpoints/create/create-vault.data.dto';
import type { DeleteVaultParamsDto } from '@shared/modules/vaults/endpoints/delete/delete-vault.params.dto';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { GetMyVaultsWithMembersDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.with-members.data.dto';
import type { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import type { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';
import type { ShareVaultDataDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.data.dto';

export interface IVaultsGateway {
  getMyVaults(): Promise<RequestServiceOutputType<GetMyVaultsDataDto>>;
  createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>>;
  deleteVault(
    input: HttpInputDto<DeleteVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>>;
  getMyVaultsWithMembers(): Promise<
    RequestServiceOutputType<GetMyVaultsWithMembersDataDto>
  >;
  editVaultMembers(input: {
    params: ShareVaultParamsDto;
    payload: ShareVaultPayloadDto;
  }): Promise<RequestServiceOutputType<ShareVaultDataDto>>;
}
