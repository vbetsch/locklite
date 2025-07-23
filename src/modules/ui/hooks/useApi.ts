import { useEffect, useState } from 'react';

type UseApiOptions<T> = {
  request: () => Promise<T>;
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
    void (async () => {
      setLoading(true);
      try {
        const data = await request();
        onSuccess(data);
      } catch (err) {
        if (err instanceof Error) onError?.(err);
        else console.error('Unhandled API error:', err);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading };
}
