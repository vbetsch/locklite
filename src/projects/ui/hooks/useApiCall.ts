import { useState, useCallback } from 'react';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/ui.logger';

type UseApiCallOptions<TData, TInput = null> = {
  request: (input?: TInput) => Promise<RequestServiceOutputType<TData>>;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};

export function useApiCall<TData, TInput = null>({
  request,
  onSuccess,
  onError,
}: UseApiCallOptions<TData, TInput>): {
  execute: (input?: TInput) => Promise<void>;
  loading: boolean;
  error?: Error;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const execute: (input?: TInput) => Promise<void> = useCallback(
    async (input?: TInput): Promise<void> => {
      setLoading(true);
      // eslint-disable-next-line no-undefined
      setError(undefined);
      try {
        const output: RequestServiceOutputType<TData> = await request(input);
        onSuccess?.(output.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          onError?.(err);
        } else {
          UiLogger.error({ message: 'Unhandled API error:', error: err });
        }
      } finally {
        setLoading(false);
      }
    },
    [request, onSuccess, onError]
  );

  return { execute, loading, error };
}
