import { useEffect } from 'react';
import { useApiCall } from './useApiCall';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

type UseApiFetchOptions<TData, TInput = undefined> = {
  request: (input?: TInput) => Promise<RequestServiceOutputType<TData>>;
  onSuccess: (data: TData) => void;
  onError?: (error: Error) => void;
  initialParams?: TInput;
};

export function useApiFetch<TData, TInput = undefined>({
  request,
  onSuccess,
  onError,
  initialParams,
}: UseApiFetchOptions<TData, TInput>): {
  loading: boolean;
  error?: Error;
  refetch: (input?: TInput) => Promise<void>;
} {
  const { execute, loading, error } = useApiCall<TData, TInput>({
    request,
    onSuccess,
    onError,
  });

  useEffect(() => {
    void execute(initialParams as TInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, refetch: execute };
}
