'use client';

import type { JSX } from 'react';
import React from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { lightTheme } from '@ui/themes/light.theme';
import { darkTheme } from '@ui/themes/dark.theme';
import type { Theme } from '@mui/material/styles';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const prefersDarkMode: boolean = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );

  const theme: Theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
