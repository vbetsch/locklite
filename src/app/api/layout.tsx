import type { JSX } from 'react';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LockLite API',
  description: 'The API of the Locklite password manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
