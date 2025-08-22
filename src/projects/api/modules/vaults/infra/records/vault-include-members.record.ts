import type { Vault } from '@prisma/client';
import type { VaultMemberWithUserRecord } from '@api/modules/vaults/infra/records/vault-member-with-user.record';

export type VaultIncludeMembersRecord = Vault & {
  members: VaultMemberWithUserRecord[];
};
