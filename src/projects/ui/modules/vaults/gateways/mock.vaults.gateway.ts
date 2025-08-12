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
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

@injectable()
export class MockVaultsGateway implements IVaultsGateway {
  private readonly _currentVaults: VaultWithMembersModelDto[] = [];

  public constructor() {
    this._currentVaults = myVaultsWithMembersDataMock;
  }

  private _getVaultById(vaultId: string): VaultWithMembersModelDto | null {
    return this._currentVaults.find(vault => vault.id === vaultId) || null;
  }

  private _getVaultIndex(vaultId: string): number {
    return this._currentVaults.findIndex(vault => vault.id === vaultId);
  }

  public async getMyVaults(): Promise<
    RequestServiceOutputType<GetMyVaultsDataDto>
  > {
    return await returnSuccessResultMock<GetMyVaultsDataDto>({
      myVaults: myVaultsDataMock,
    });
  }

  public async createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    return await returnSuccessResultMock<CreateVaultDataDto>({
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
    return await returnSuccessResultMock<number>(StatusCodes.NO_CONTENT);
  }

  // TODO: Migrate in getMyVaults
  public async getMyVaultsWithMembers(): Promise<
    RequestServiceOutputType<GetMyVaultsWithMembersDataDto>
  > {
    return await returnSuccessResultMock<GetMyVaultsWithMembersDataDto>(
      {
        myVaults: this._currentVaults,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      3000
    );
  }

  // TODO: Migrate in abstract and implementations
  public async editVaultMembers(input: {
    params: EditMembersParamsDto;
    payload: EditMembersPayloadDto;
  }): Promise<RequestServiceOutputType<number>> {
    console.log('deleteVault: ', input.params, input.payload);
    const vaultFound: VaultWithMembersModelDto | null = this._getVaultById(
      input.params.id
    );
    if (!vaultFound) {
      console.warn('[MOCK] editVaultMembers: vault not found');
    } else {
      this._currentVaults[this._getVaultIndex(input.params.id)] = {
        ...vaultFound,
        members: [...input.payload.overrideMembers],
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return await returnSuccessResultMock<number>(StatusCodes.NO_CONTENT, 2500);
  }
}
