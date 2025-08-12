import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

// TODO: To migrate in GetMyVaultsDataDto
export type GetMyVaultsWithMembersDataDto = {
  myVaults: VaultWithMembersModelDto[];
};
