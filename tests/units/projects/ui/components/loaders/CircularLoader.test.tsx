import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CircularLoader from '@ui/components/loaders/CircularLoader';

describe('CircularLoader', () => {
  it('renders nothing when loading is false', (): void => {
    const { container } = render(<CircularLoader loading={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a progress indicator when loading is true', (): void => {
    render(<CircularLoader loading={true} />);
    const progress: HTMLElement = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });
});
