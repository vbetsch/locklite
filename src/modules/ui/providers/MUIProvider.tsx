'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { JSX } from 'react';
import React from 'react';
import { theme } from '@ui/themes/theme';

type MUIProviderProps = {
  children: JSX.Element;
};

export default function MUIProvider(props: MUIProviderProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
