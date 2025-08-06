'use client';

import type { JSX } from 'react';
import React from 'react';
import ThemeRegistry from '@ui/providers/ThemeRegistry';
import MainNavBar from '@ui/components/navigation/organisms/MainNavBar';
import { Container } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

type ClientProvidersProps = {
  children: React.ReactNode;
};

export default function ClientProviders({
  children,
}: ClientProvidersProps): JSX.Element {
  return (
    <ThemeRegistry>
      <SessionProvider>
        <MainNavBar />
      </SessionProvider>
      <Container component="main">{children}</Container>
    </ThemeRegistry>
  );
}
