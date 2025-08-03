import { useEffect, useState } from 'react';
import type { RequestServiceOutputType } from '@shared/types/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';

type UseApiOptions<T> = {
  request: () => Promise<RequestServiceOutputType<T>>;
  onSuccess: (data: T) => void;
  onError?: (error: Error) => void;
  deps?: unknown[];
};

export function useApi<T>({
  request,
  onSuccess,
  onError,
  deps = [],
}: UseApiOptions<T>): { loading: boolean } {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async (): Promise<void> => {
      setLoading(true);
      try {
        const output: Awaited<RequestServiceOutputType<T>> = await request();
        onSuccess(output.data);
      } catch (error) {
        if (error instanceof Error) onError?.(error);
        else UiLogger.error('Unhandled API error: ', error);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading };
}
