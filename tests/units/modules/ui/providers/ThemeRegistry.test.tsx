import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as mui from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ThemeRegistry from '@ui/providers/ThemeRegistry';

function TestComponent(): JSX.Element {
  const theme: Theme = useTheme();
  // eslint-disable-next-line no-restricted-syntax
  return <div data-testid="mode">{theme.palette.mode}</div>;
}

describe('ThemeRegistry', () => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('should apply dark theme when prefers-color-scheme is dark', (): void => {
    jest.spyOn(mui, 'useMediaQuery').mockReturnValue(true);
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('should apply light theme when prefers-color-scheme is not dark', (): void => {
    jest.spyOn(mui, 'useMediaQuery').mockReturnValue(false);
    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });
});
