import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';

// TODO: To move in GetMyVaultsDataDto
export type GetMyVaultsWithMembersDataDto = {
  myVaults: VaultWithMembersModelDto[];
};
