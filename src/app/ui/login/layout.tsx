import type { JSX } from 'react';
import React from 'react';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';

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
