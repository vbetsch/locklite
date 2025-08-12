import type { VaultMemberModelDto } from '@shared/modules/vaults/vault-member.model.dto';

export type EditMembersPayloadDto = {
  overrideMembers: VaultMemberModelDto[];
};
