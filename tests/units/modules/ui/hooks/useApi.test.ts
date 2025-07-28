import { renderHook, act } from '@testing-library/react';
import { useApi } from '@ui/hooks/useApi';

describe('useApi', () => {
  it('should call onSuccess and set loading to false on success', async (): Promise<void> => {
    type Data = { foo: string };
    const data: Data = { foo: 'bar' };
    const request: () => Promise<Data> = jest.fn(() => Promise.resolve(data));
    const onSuccess: (response: Data) => void = jest.fn();
    const onError: (error: Error) => void = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi<Data>({ request, onSuccess, onError })
    );

    // initial state
    expect(result.current.loading).toBe(true);

    // wait for effect to complete
    await act(async () => {
      await waitForNextUpdate();
    });

    expect(request).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(data);
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it('should call onError and set loading to false on Error rejection', async (): Promise<void> => {
    const error: Error = new Error('Failure');
    const request: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(error)
    );
    const onSuccess: (response: unknown) => void = jest.fn();
    const onError: (err: Error) => void = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi<unknown>({ request, onSuccess, onError })
    );

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(request).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
    expect(result.current.loading).toBe(false);
  });

  it('should log non-Error and set loading to false when rejection is non-Error', async (): Promise<void> => {
    const rejectionValue: unknown = { code: 123 };
    const request: () => Promise<unknown> = jest.fn(() =>
      Promise.reject(rejectionValue)
    );
    const onSuccess: (response: unknown) => void = jest.fn();
    const onError: (err: Error) => void = jest.fn();
    const consoleErrorSpy: jest.SpyInstance<void, [unknown]> = jest
      .spyOn(console, 'error')
      .mockImplementation((): void => {
        /* ignore */
      });

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi<unknown>({ request, onSuccess, onError })
    );

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(request).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unhandled API error:',
      rejectionValue
    );
    expect(result.current.loading).toBe(false);

    consoleErrorSpy.mockRestore();
  });
});
