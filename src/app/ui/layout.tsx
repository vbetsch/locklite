import { cookies } from 'next/headers';
import { lightTheme } from '@ui/themes/light.theme';
import { darkTheme } from '@ui/themes/dark.theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { Metadata } from 'next';
import './globals.css';
import type { JSX } from 'react';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'LockLite',
    template: '%s | LockLite',
  },
  description: 'The best secure password manager',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const themeCookie = (await cookies()).get('theme')?.value ?? 'light';
  const theme = themeCookie === 'dark' ? darkTheme : lightTheme;

  return (
    <html lang="fr">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
