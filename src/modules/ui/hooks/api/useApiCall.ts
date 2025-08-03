import { useState, useCallback } from 'react';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';

type UseApiCallOptions<T> = {
  request: () => Promise<RequestServiceOutputType<T>>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export function useApiCall<Data>({
  request,
  onSuccess,
  onError,
}: UseApiCallOptions<Data>): {
  execute: () => Promise<void>;
  loading: boolean;
  error?: Error;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const execute: () => Promise<void> = useCallback(async (): Promise<void> => {
    setLoading(true);
    // eslint-disable-next-line no-undefined
    setError(undefined);
    try {
      const output: RequestServiceOutputType<Data> = await request();
      onSuccess?.(output.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        onError?.(err);
      } else {
        UiLogger.error('Unhandled API error: ', err);
      }
    } finally {
      setLoading(false);
    }
  }, [request, onSuccess, onError]);

  return { execute, loading, error };
}
