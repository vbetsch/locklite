import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as mui from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import ThemeRegistry from '@ui/providers/ThemeRegistry';

jest.mock('@mui/material', (): typeof mui => {
  const actual: typeof mui = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

const useMediaQueryMock: jest.MockedFunction<typeof mui.useMediaQuery> =
  mui.useMediaQuery as jest.MockedFunction<typeof mui.useMediaQuery>;

function TestComponent(): JSX.Element {
  const theme: Theme = useTheme();
  // eslint-disable-next-line no-restricted-syntax
  return <div data-testid="mode">{theme.palette.mode}</div>;
}

describe('ThemeRegistry', () => {
  beforeEach((): void => {
    useMediaQueryMock.mockReset();
  });

  it('should apply dark theme when prefers-color-scheme is dark', (): void => {
    useMediaQueryMock.mockReturnValue(true);

    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('should apply light theme when prefers-color-scheme is not dark', (): void => {
    useMediaQueryMock.mockReturnValue(false);

    render(
      <ThemeRegistry>
        <TestComponent />
      </ThemeRegistry>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });
});
