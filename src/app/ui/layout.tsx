import type { Metadata } from 'next';
import './globals.css';
import type { JSX } from 'react';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@ui/themes/light.theme';

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
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <div className={'foobarbaz'}>
            <header>header</header>
            <main>{children}</main>
            <footer>footer</footer>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
