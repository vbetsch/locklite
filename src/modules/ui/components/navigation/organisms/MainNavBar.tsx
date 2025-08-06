import React from 'react';
import type { JSX } from 'react';
import NavBar from '@ui/components/navigation/molecules/NavBar';
import { CONSTANTS } from '@shared/config/constants';

export default function MainNavBar(): JSX.Element {
  return <NavBar title={CONSTANTS.APP_NAME} authenticated={true} />;
}
