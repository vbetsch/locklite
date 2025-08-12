import type { VaultWithMembersModelDto } from '@shared/modules/vaults/vault.with-members.model.dto';

// TODO: To migrate in GetMyVaultsDataDto
export type GetMyVaultsWithMembersDataDto = {
  myVaults: VaultWithMembersModelDto[];
};
