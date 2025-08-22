import type { UserSelectRecord } from './user-select.record';

export type VaultMemberWithUserRecord = {
  uuid: string;
  vaultId: string;
  userId: string;
  user: UserSelectRecord;
};
