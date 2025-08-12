'use client';

import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import { useSession } from 'next-auth/react';

export function useMembers(
  members: Omit<UserModelDto, 'id'>[]
): Omit<UserModelDto, 'id'>[] {
  const { data: session } = useSession();
  return session?.user?.email
    ? members.filter(member => member.email !== session.user?.email)
    : members;
}
