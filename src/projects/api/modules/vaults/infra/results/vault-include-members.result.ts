import type { Vault } from '@prisma/client';

export type VaultIncludeMembersResult = Vault & {
  members: {
    uuid: string;
    vaultId: string;
    userId: string;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  }[];
};
