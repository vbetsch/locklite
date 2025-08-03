import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import { UiLogger } from '@ui/logs/ui.logger';

describe('ErrorMessage', () => {
  it('renders nothing when error is null', (): void => {
    const { container } = render(<ErrorMessage error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the error message and logs error when an Error is provided', (): void => {
    const error: Error = new Error('Test error');
    const loggerSpy: jest.SpyInstance<void, [unknown, Error]> = jest
      .spyOn(UiLogger, 'error')
      .mockImplementation((): void => {
        return;
      });

    render(<ErrorMessage error={error} />);
    expect(loggerSpy).toHaveBeenCalledWith(null, error);

    const messageElement: HTMLElement = screen.getByText('Error: Test error');
    expect(messageElement).toBeInTheDocument();

    loggerSpy.mockRestore();
  });

  it("renders 'Unknown error' when error.message is empty", (): void => {
    const error: Error = new Error('');
    const loggerSpy: jest.SpyInstance<void, [unknown, Error]> = jest
      .spyOn(UiLogger, 'error')
      .mockImplementation((): void => {
        return;
      });

    render(<ErrorMessage error={error} />);
    expect(loggerSpy).toHaveBeenCalledWith(null, error);

    const messageElement: HTMLElement = screen.getByText(
      'Error: Unknown error'
    );
    expect(messageElement).toBeInTheDocument();

    loggerSpy.mockRestore();
  });
});
