import { useEffect } from 'react';
import { useApiCall } from './useApiCall';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

type UseApiFetchOptions<TData, TParams = undefined> = {
  request: (params?: TParams) => Promise<RequestServiceOutputType<TData>>;
  onSuccess: (data: TData) => void;
  onError?: (error: Error) => void;
  initialParams?: TParams;
};

export function useApiFetch<TData, TParams = undefined>({
  request,
  onSuccess,
  onError,
  initialParams,
}: UseApiFetchOptions<TData, TParams>): {
  loading: boolean;
  error?: Error;
  refetch: (params?: TParams) => Promise<void>;
} {
  const { execute, loading, error } = useApiCall<TData, TParams>({
    request,
    onSuccess,
    onError,
  });

  useEffect(() => {
    void execute(initialParams as TParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, refetch: execute };
}
