import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Typography } from '@mui/material';
import { useApi } from '@ui/hooks/useApi';
import { UiLogger } from '@ui/logs/ui.logger';

type Data = { foo: string };
type RequestFn<T> = () => Promise<{ data: T }>;
type OnSuccessFn<T> = (data: T) => void;
type OnErrorFn = (error: Error) => void;

describe('useApi', () => {
  it('should call onSuccess and set loading to false on success', async (): Promise<void> => {
    const data: Data = { foo: 'bar' };
    const request: RequestFn<Data> = jest.fn(() => Promise.resolve({ data }));
    const onSuccess: OnSuccessFn<Data> = jest.fn((_data: Data): void => void 0);
    const onError: OnErrorFn = jest.fn((_error: Error): void => void 0);

    function TestComponent(): JSX.Element {
      const { loading } = useApi<Data>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return (
        <Typography data-testid="status">
          {loading ? 'loading' : 'done'}
        </Typography>
      );
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
    const error: Error = new Error('Failure');
    const request: RequestFn<unknown> = jest.fn(() => Promise.reject(error));
    const onSuccess: OnSuccessFn<unknown> = jest.fn(
      (_data: unknown): void => void 0
    );
    const onError: OnErrorFn = jest.fn((_error: Error): void => void 0);

    function TestComponent(): JSX.Element {
      const { loading } = useApi<unknown>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return (
        <Typography data-testid="status">
          {loading ? 'loading' : 'done'}
        </Typography>
      );
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
    const request: RequestFn<unknown> = jest.fn(() =>
      Promise.reject(rejectionValue)
    );
    const onSuccess: OnSuccessFn<unknown> = jest.fn(
      (_data: unknown): void => void 0
    );
    const onError: OnErrorFn = jest.fn((_error: Error): void => void 0);
    const loggerSpy: jest.SpyInstance<void, [string, unknown]> = jest
      .spyOn(UiLogger, 'error')
      .mockImplementation((): void => void 0);

    function TestComponent(): JSX.Element {
      const { loading } = useApi<unknown>({
        request,
        onSuccess,
        onError,
        deps: [],
      });
      return (
        <Typography data-testid="status">
          {loading ? 'loading' : 'done'}
        </Typography>
      );
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
