import type { Metadata } from 'next';
import type { JSX } from 'react';
import React from 'react';
import ThemeRegistry from '@ui/providers/ThemeRegistry';
import { Container } from '@mui/material';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import MainNavBar from '@ui/components/navigation/organisms/MainNavBar';
import { CONSTANTS } from '@shared/config/constants';

export const metadata: Metadata = {
  title: {
    default: CONSTANTS.APP_NAME,
    template: `%s | ${CONSTANTS.APP_NAME}`,
  },
  description: 'The best secure password manager',
};

export default function RootLayout({
  children,
}: SharedLayoutProps): JSX.Element {
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en" style={{ height: '100%' }}>
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body style={{ height: '100%', margin: 0 }}>
        <ThemeRegistry>
          <MainNavBar />
          <Container component="main">{children}</Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
