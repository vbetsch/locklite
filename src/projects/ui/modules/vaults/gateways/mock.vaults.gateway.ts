import { injectable } from 'tsyringe';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/create/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/modules/vaults/create/create-vault.data.dto';
import type { CreateVaultParamsDto } from '@shared/modules/vaults/create/create-vault.params.dto';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { StatusCodes } from 'http-status-codes';
import { GetMyVaultsWithMembersDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.with-members.data.dto';
import { myVaultsDataMock } from '@ui/modules/vaults/mocks/myVaults.data.mock';
import { myVaultsWithMembersDataMock } from '@ui/modules/vaults/mocks/myVaults.withMembers.data.mock';
import { EditMembersParamsDto } from '@shared/modules/vaults/edit-members/edit-members.params.dto';
import { EditMembersPayloadDto } from '@shared/modules/vaults/edit-members/edit-members.payload.dto';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';

@injectable()
export class MockVaultsGateway implements IVaultsGateway {
  public async getMyVaults(): Promise<
    RequestServiceOutputType<GetMyVaultsDataDto>
  > {
    return await returnSuccessResultMock({
      myVaults: myVaultsDataMock,
    });
  }

  public async createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await returnSuccessResultMock({
      vaultCreated: {
        ...input.payload,
        id: 'new',
      },
    });
  }

  public async deleteVault(
    input: HttpInputDto<CreateVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', input);
    return await returnSuccessResultMock(StatusCodes.NO_CONTENT);
  }

  // TODO: Migrate in getMyVaults
  public async getMyVaultsWithMembers(): Promise<
    RequestServiceOutputType<GetMyVaultsWithMembersDataDto>
  > {
    return await returnSuccessResultMock(
      {
        myVaults: myVaultsWithMembersDataMock,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      3000
    );
  }

  // TODO: Migrate in abstract and implementations
  public async editMembersOfVault(input: {
    params: EditMembersParamsDto;
    payload: EditMembersPayloadDto;
  }): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', input.params, input.payload);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return await returnSuccessResultMock(StatusCodes.NO_CONTENT, 2500);
  }
}
