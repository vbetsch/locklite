import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

export type ShareVaultPayloadDto = {
  overrideMembers: VaultMemberModelDto[];
};
