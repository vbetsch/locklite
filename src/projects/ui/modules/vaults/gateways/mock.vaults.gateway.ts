import { injectable } from 'tsyringe';
import { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/create/create-vault.payload.dto';
import type { CreateVaultDataDto } from '@shared/modules/vaults/create/create-vault.data.dto';
import type { DeleteVaultParamsDto } from '@shared/modules/vaults/delete/delete-vault.params.dto';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { StatusCodes } from 'http-status-codes';
import { GetMyVaultsWithMembersDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.with-members.data.dto';
import { myVaultsDataMock } from '@ui/modules/vaults/mocks/myVaults.data.mock';
import { myVaultsWithMembersDataMock } from '@ui/modules/vaults/mocks/myVaults.withMembers.data.mock';
import { EditMembersParamsDto } from '@shared/modules/vaults/edit-members/edit-members.params.dto';
import { EditMembersPayloadDto } from '@shared/modules/vaults/edit-members/edit-members.payload.dto';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import { EditMembersDataDto } from '@shared/modules/vaults/edit-members/edit-members.data.dto';
import { currentUserDataMock } from '@ui/modules/users/mocks/currentUser.data.mock';

let mockVaults: VaultWithMembersModelDto[] = myVaultsWithMembersDataMock;

@injectable()
export class MockVaultsGateway implements IVaultsGateway {
  private _getVaultById(vaultId: string): VaultWithMembersModelDto | null {
    return mockVaults.find(vault => vault.id === vaultId) || null;
  }

  private _getVaultByLabel(
    vaultLabel: string
  ): VaultWithMembersModelDto | null {
    return mockVaults.find(vault => vault.label === vaultLabel) || null;
  }

  private _getVaultIndex(vaultId: string): number {
    return mockVaults.findIndex(vault => vault.id === vaultId);
  }

  public async getMyVaults(): Promise<
    RequestServiceOutputType<GetMyVaultsDataDto>
  > {
    return await returnSuccessResultMock<GetMyVaultsDataDto>(
      {
        myVaults: myVaultsDataMock,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      4000
    );
  }

  public async createVault(
    input: HttpInputDto<null, CreateVaultPayloadDto>
  ): Promise<RequestServiceOutputType<CreateVaultDataDto>> {
    if (this._getVaultByLabel(input.payload.label))
      throw new Error('already exists');
    const vaultCreated: VaultWithMembersModelDto = {
      ...input.payload,
      id: input.payload.label,
      members: [],
    };
    mockVaults = [...mockVaults, vaultCreated];
    return await returnSuccessResultMock<CreateVaultDataDto>(
      {
        vaultCreated,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      1500
    );
  }

  public async deleteVault(
    input: HttpInputDto<DeleteVaultParamsDto, null>
  ): Promise<RequestServiceOutputType<number>> {
    mockVaults = mockVaults.filter(vault => vault.id !== input.params.vaultId);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return await returnSuccessResultMock<number>(StatusCodes.NO_CONTENT, 3000);
  }

  // TODO: Migrate in getMyVaults
  public async getMyVaultsWithMembers(): Promise<
    RequestServiceOutputType<GetMyVaultsWithMembersDataDto>
  > {
    return await returnSuccessResultMock<GetMyVaultsWithMembersDataDto>(
      {
        myVaults: mockVaults,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      3000
    );
  }

  // TODO: Migrate in abstract and implementations
  public async editVaultMembers(input: {
    params: EditMembersParamsDto;
    payload: EditMembersPayloadDto;
  }): Promise<RequestServiceOutputType<EditMembersDataDto>> {
    const vaultFound: VaultWithMembersModelDto | null = this._getVaultById(
      input.params.vaultId
    );
    if (!vaultFound) {
      throw new Error('[MOCK] editVaultMembers: vault not found');
    }
    const vaultEdited: VaultWithMembersModelDto = {
      ...vaultFound,
      members: [...input.payload.overrideMembers, currentUserDataMock],
    };
    mockVaults[this._getVaultIndex(input.params.vaultId)] = vaultEdited;
    return await returnSuccessResultMock<EditMembersDataDto>(
      {
        vaultEdited,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      2500
    );
  }
}
