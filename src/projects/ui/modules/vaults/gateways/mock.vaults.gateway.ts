import { injectable } from 'tsyringe';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/dto/output/data/vaults/create-vault.data.dto';
import type { CreateVaultParamsDto } from '@shared/dto/input/params/create-vault.params.dto';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { StatusCodes } from 'http-status-codes';
import { GetMyVaultsWithMembersDataDto } from '@shared/dto/output/data/vaults/get-my-vaults.with-members.data.dto';
import { myVaultsDataMock } from '@ui/modules/vaults/mocks/myVaults.data.mock';
import { myVaultsWithMembersDataMock } from '@ui/modules/vaults/mocks/myVaults.withMembers.data.mock';

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
    data: CreateVaultPayloadDto
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await returnSuccessResultMock({
      vaultCreated: {
        ...data,
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
}
