import type { Metadata } from 'next';
import type { JSX } from 'react';
import React from 'react';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import { CONSTANTS } from '@shared/config/constants';
import ClientProviders from '@ui/providers/ClientProviders';
import PageLayout from '@ui/components/templates/PageLayout';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: CONSTANTS.APP_NAME,
    template: `%s | ${CONSTANTS.APP_NAME}`,
  },
  description: 'The best secure password manager',
};

export default function RootLayout(props: SharedLayoutProps): JSX.Element {
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en" style={{ height: '100%' }}>
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body style={{ height: '100%', margin: 0 }}>
        <SpeedInsights />
        <ClientProviders>
          <PageLayout>{props.children}</PageLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
