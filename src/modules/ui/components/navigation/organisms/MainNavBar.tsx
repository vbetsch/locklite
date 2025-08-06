import React from 'react';
import type { JSX } from 'react';
import NavBar from '@ui/components/navigation/molecules/NavBar';
import { CONSTANTS } from '@shared/config/constants';
import { SessionProvider } from 'next-auth/react';

export default function MainNavBar(): JSX.Element {
  return (
    <SessionProvider>
      <NavBar title={CONSTANTS.APP_NAME} />
    </SessionProvider>
  );
}
