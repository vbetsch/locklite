import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useApi } from '@ui/hooks/useApi';
import { UiLogger } from '@ui/logs/ui.logger';

type Data = { foo: string };

describe('useApi', () => {
  it('should call onSuccess and set loading to false on success', async (): Promise<void> => {
    const data: Data = { foo: 'bar' };
    const request = jest.fn(
      (): Promise<{ data: Data }> => Promise.resolve({ data })
    );
    const onSuccess = jest.fn((_d: Data): void => {});
    const onError = jest.fn((_e: Error): void => {});

    function TestComponent(): JSX.Element {
      const { loading } = useApi<Data>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return <div data-testid="status">{loading ? 'loading' : 'done'}</div>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId('status')).toHaveTextContent('loading');

    await waitFor(() =>
      expect(screen.getByTestId('status')).toHaveTextContent('done')
    );

    expect(request).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(data);
    expect(onError).not.toHaveBeenCalled();
  });

  it('should call onError and set loading to false on Error rejection', async (): Promise<void> => {
    const error = new Error('Failure');
    const request = jest.fn((): Promise<unknown> => Promise.reject(error));
    const onSuccess = jest.fn((_d: unknown): void => {});
    const onError = jest.fn((_e: Error): void => {});

    function TestComponent(): JSX.Element {
      const { loading } = useApi<unknown>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return <div data-testid="status">{loading ? 'loading' : 'done'}</div>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId('status')).toHaveTextContent('loading');

    await waitFor(() =>
      expect(screen.getByTestId('status')).toHaveTextContent('done')
    );

    expect(request).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
  });

  it('should log non-Error and set loading to false when rejection is non-Error', async (): Promise<void> => {
    const rejectionValue: unknown = { code: 123 };
    const request = jest.fn(
      (): Promise<unknown> => Promise.reject(rejectionValue)
    );
    const onSuccess = jest.fn((_d: unknown): void => {});
    const onError = jest.fn((_e: Error): void => {});
    const loggerSpy = jest
      .spyOn(UiLogger, 'error')
      .mockImplementation((): void => {});

    function TestComponent(): JSX.Element {
      const { loading } = useApi<unknown>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return <div data-testid="status">{loading ? 'loading' : 'done'}</div>;
    }

    render(<TestComponent />);
    expect(screen.getByTestId('status')).toHaveTextContent('loading');

    await waitFor(() =>
      expect(screen.getByTestId('status')).toHaveTextContent('done')
    );

    expect(request).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(loggerSpy).toHaveBeenCalledWith(
      'Unhandled API error: ',
      rejectionValue
    );

    loggerSpy.mockRestore();
  });
});
