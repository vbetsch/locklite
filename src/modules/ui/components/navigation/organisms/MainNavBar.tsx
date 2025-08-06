import React from 'react';
import type { JSX } from 'react';
import NavBar from '@ui/components/navigation/molecules/NavBar';
import { CONSTANTS } from '@shared/config/constants';
import { useSession } from 'next-auth/react';

export default function MainNavBar(): JSX.Element {
  const { data: session } = useSession();
  return (
    <NavBar
      title={CONSTANTS.APP_NAME}
      loading={!session}
      authenticated={!!session?.user}
    />
  );
}
