import {useEffect} from 'react'

type UseApiOptions<T> = {
    request: () => Promise<T>
    onSuccess: (data: T) => void
    onError?: (error: Error) => void
    deps?: unknown[]
}

export function useApi<T>({
                              request,
                              onSuccess,
                              onError,
                              deps,
                          }: UseApiOptions<T>) {
    useEffect(() => {
        if (!deps) return

        void (async () => {
            try {
                const data = await request()
                onSuccess(data)
            } catch (err) {
                if (err instanceof Error) onError?.(err)
                else console.error('Unhandled API error:', err)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
