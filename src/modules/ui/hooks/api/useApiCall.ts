import { useState, useCallback } from 'react';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';

type UseApiCallOptions<TData, TArgs extends unknown[] = []> = {
  request: (...args: TArgs) => Promise<RequestServiceOutputType<TData>>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};

export function useApiCall<TData, TArgs extends unknown[] = []>({
  request,
  onSuccess,
  onError,
}: UseApiCallOptions<TData, TArgs>): {
  execute: (...args: TArgs) => Promise<void>;
  loading: boolean;
  error?: Error;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const execute: (...args: TArgs) => Promise<void> = useCallback(
    async (...args: TArgs): Promise<void> => {
      setLoading(true);
      // eslint-disable-next-line no-undefined
      setError(undefined);
      try {
        const output: RequestServiceOutputType<TData> = await request(...args);
        onSuccess?.(output.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          onError?.(err);
        } else {
          UiLogger.error('Unhandled API error:', err);
        }
      } finally {
        setLoading(false);
      }
    },
    [request, onSuccess, onError]
  );

  return { execute, loading, error };
}
