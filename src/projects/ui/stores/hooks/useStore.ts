'use client';

import { useSyncExternalStore } from 'react';
import type { IReadonlyStore } from '@ui/stores/interfaces/readonly.store.interface';
import type { UnsubscribeStoreType } from '@ui/stores/unsubscribe.store.type';

export function useStore<T>(store: IReadonlyStore<T>): T {
  return useSyncExternalStore(
    (listener: () => void): UnsubscribeStoreType => store.subscribe(listener),
    (): T => store.getSnapshot(),
    (): T => store.getSnapshot()
  );
}
