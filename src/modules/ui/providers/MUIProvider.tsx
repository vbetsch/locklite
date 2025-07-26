'use client';
import type { JSX } from 'react';
import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@ui/themes/light.theme';
import { darkTheme } from '@ui/themes/dark.theme';

type ColorMode = 'light' | 'dark';

const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  mode: 'light' as ColorMode,
});

export const useColorMode = (): {
  toggleColorMode: () => void;
  mode: ColorMode;
} => useContext(ThemeContext);

export default function MUIProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ColorMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem('color-mode') as ColorMode | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(stored ?? (system ? 'dark' : 'light'));
    setMounted(true);
  }, []);

  const toggleColorMode = (): void => {
    setMode((prev) => {
      const newMode: ColorMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('color-mode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
