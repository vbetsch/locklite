import type { JSX } from 'react';
import React from 'react';
import type { Metadata } from 'next';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import { CONSTANTS } from '@shared/config/constants';

export const metadata: Metadata = {
  title: CONSTANTS.APP_NAME,
  description: 'The best secure password manager',
};

export default function RootLayout(props: SharedLayoutProps): JSX.Element {
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en" style={{ height: '100%' }}>
      {/*eslint-disable-next-line no-restricted-syntax*/}
      <body style={{ height: '100%', margin: 0 }}>{props.children}</body>
    </html>
  );
}
