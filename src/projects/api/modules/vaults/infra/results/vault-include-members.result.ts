import type { Vault } from '@prisma/client';

export type VaultIncludeMembersResult = {
  members: {
    id: string;
    name: string;
    email: string;
  }[];
} & Vault;
