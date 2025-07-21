import {useEffect} from 'react'

type UseApiOptions<T> = {
    request: () => Promise<T>
    onSuccess: (data: T) => void
    onError?: (error: Error) => void
}

export function useApi<T>({request, onSuccess, onError}: UseApiOptions<T>) {
    useEffect(() => {
        void (async () => {
            try {
                const data = await request()
                onSuccess(data)
            } catch (err) {
                if (err instanceof Error) {
                    onError?.(err)
                } else {
                    console.error('Unhandled API error:', err)
                }
            }
        })()
    }, [request, onSuccess, onError])
}
