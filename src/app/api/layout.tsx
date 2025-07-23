import React, { JSX } from 'react';
import { Metadata } from 'next';

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
