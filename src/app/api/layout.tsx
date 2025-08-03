import type { JSX } from 'react';
import React from 'react';
import type { Metadata } from 'next';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';

export const metadata: Metadata = {
  title: 'LockLite API',
  description: 'The API of the Locklite password manager',
};

export default function RootLayout({
  children,
}: SharedLayoutProps): JSX.Element {
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en">
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body>{children}</body>
    </html>
  );
}
