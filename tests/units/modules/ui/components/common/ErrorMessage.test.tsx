import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@ui/components/common/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders nothing when error is null', (): void => {
    const { container }: { container: HTMLElement } = render(
      <ErrorMessage error={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the error message when an Error is provided', (): void => {
    const error: Error = new Error('Test error');
    render(<ErrorMessage error={error} />);
    const messageElement: HTMLElement = screen.getByText('Error: Test error');
    expect(messageElement).toBeInTheDocument();
  });

  it("renders 'Unknown error' when error.message is empty", (): void => {
    const error: Error = new Error('');
    render(<ErrorMessage error={error} />);
    const messageElement: HTMLElement = screen.getByText(
      'Error: Unknown error'
    );
    expect(messageElement).toBeInTheDocument();
  });
});
