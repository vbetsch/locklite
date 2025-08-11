import React from 'react';
import type { JSX } from 'react';
import NavBar from '@ui/components/navigation/NavBar';
import { CONSTANTS } from '@shared/config/constants';
import { useSession } from 'next-auth/react';
import { SessionStatus } from '@shared/auth/session-status.enum';
import ProfileNavItem from '@ui/modules/auth/components/molecules/ProfileNavItem';

export default function AuthNavBar(): JSX.Element {
  const { data: session, status } = useSession();
  return (
    <NavBar title={CONSTANTS.APP_NAME}>
      {status !== SessionStatus.LOADING && !!session?.user && (
        <ProfileNavItem />
      )}
    </NavBar>
  );
}
