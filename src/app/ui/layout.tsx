import type { Metadata } from 'next';
import './globals.css';
import type { JSX } from 'react';
import React from 'react';
import MUIProvider from '@ui/providers/MUIProvider';

export const metadata: Metadata = {
  title: {
    default: 'LockLite',
    template: '%s | LockLite',
  },
  description: 'The best secure password manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <MUIProvider>
          <div className="root">
            <header>header</header>
            <main>{children}</main>
            <footer>footer</footer>
          </div>
        </MUIProvider>
      </body>
    </html>
  );
}
