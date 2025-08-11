import { injectable } from 'tsyringe';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/dto/output/data/create-vault.data.dto';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class MockVaultsGateway implements IVaultsGateway {
  public async getMyVaults(): Promise<
    RequestServiceOutputType<GetMyVaultsDataDto>
  > {
    return await returnSuccessResultMock({
      myVaults: [],
    });
  }

  public async createVault(
    data: CreateVaultPayloadDto
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await returnSuccessResultMock({
      ...data,
      id: 'new',
    });
  }

  public async deleteVault(
    params: CreateVaultParams
  ): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', params);
    return await returnSuccessResultMock(StatusCodes.NO_CONTENT);
  }
}
