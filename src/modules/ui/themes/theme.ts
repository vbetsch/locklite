'use client';
import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});
