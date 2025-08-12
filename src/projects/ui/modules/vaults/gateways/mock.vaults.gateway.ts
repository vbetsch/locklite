import { injectable } from 'tsyringe';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/vaults/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/dto/output/data/vaults/create-vault.data.dto';
import type { CreateVaultParamsDto } from '@shared/dto/input/params/create-vault.params.dto';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { StatusCodes } from 'http-status-codes';
import { GetMyVaultsWithMembersDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.with-members.data.dto';
import { myVaultsDataMock } from '@ui/modules/vaults/mocks/myVaults.data.mock';
import { myVaultsWithMembersDataMock } from '@ui/modules/vaults/mocks/myVaults.withMembers.data.mock';
import { EditMembersParamsDto } from '@shared/dto/input/params/edit-members.params.dto';

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
    payload: CreateVaultPayloadDto
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await returnSuccessResultMock({
      vaultCreated: {
        ...payload,
        id: 'new',
      },
    });
  }

  public async deleteVault(
    params: CreateVaultParamsDto
  ): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', params);
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
  public async editMembersOfVault(
    params: EditMembersParamsDto
  ): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', params);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return await returnSuccessResultMock(StatusCodes.NO_CONTENT, 2500);
  }
}
