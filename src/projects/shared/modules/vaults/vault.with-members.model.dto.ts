import type { VaultMemberModelDto } from '@shared/modules/vaults/vault-member.model.dto';

// TODO: To migrate in VaultModelDto
export type VaultWithMembersModelDto = {
  id: string;
  label: string;
  secret: string;
  members: VaultMemberModelDto[];
};
