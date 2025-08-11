import React from 'react';
import type { JSX } from 'react';
import NavBar from '@ui/components/navigation/molecules/NavBar';
import { CONSTANTS } from '@shared/config/constants';
import { useSession } from 'next-auth/react';
import { SessionStatus } from '@shared/auth/session-status.enum';

export default function MainNavBar(): JSX.Element {
  const { data: session, status } = useSession();
  return (
    <NavBar
      title={CONSTANTS.APP_NAME}
      loading={status === SessionStatus.LOADING}
      authenticated={!!session?.user}
    />
  );
}
