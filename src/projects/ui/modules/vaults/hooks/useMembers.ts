'use client';

import { useSession } from 'next-auth/react';
import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

export function useMembers(
  members: VaultMemberModelDto[]
): VaultMemberModelDto[] {
  const { data: session } = useSession();
  return session?.user?.email
    ? members.filter(member => member.email !== session.user?.email)
    : members;
}
