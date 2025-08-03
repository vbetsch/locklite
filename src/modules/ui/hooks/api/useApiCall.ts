import { useState, useCallback } from 'react';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';

type UseApiCallOptions<TData, TParams = null> = {
  request: (params?: TParams) => Promise<RequestServiceOutputType<TData>>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};

export function useApiCall<TData, TParams = null>({
  request,
  onSuccess,
  onError,
}: UseApiCallOptions<TData, TParams>): {
  execute: (params?: TParams) => Promise<void>;
  loading: boolean;
  error?: Error;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const execute: (params?: TParams) => Promise<void> = useCallback(
    async (params?: TParams): Promise<void> => {
      setLoading(true);
      // eslint-disable-next-line no-undefined
      setError(undefined);
      try {
        const output: RequestServiceOutputType<TData> = await request(params);
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
