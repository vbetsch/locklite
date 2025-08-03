import { useEffect } from 'react';
import { useApiCall } from './useApiCall';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

type UseApiFetchOptions<T> = {
  request: () => Promise<RequestServiceOutputType<T>>;
  onSuccess: (data: T) => void;
  onError?: (error: Error) => void;
  deps?: unknown[];
};

export function useApiFetch<T>({
  request,
  onSuccess,
  onError,
}: UseApiFetchOptions<T>): {
  loading: boolean;
  error?: Error;
  refetch: () => Promise<void>;
} {
  const { execute, loading, error } = useApiCall<T>({
    request,
    onSuccess,
    onError,
  });

  useEffect(() => {
    void execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, refetch: execute };
}
