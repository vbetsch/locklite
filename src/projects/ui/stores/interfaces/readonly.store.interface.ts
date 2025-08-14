import type { UnsubscribeStoreType } from '@ui/stores/unsubscribe.store.type';

export interface IReadonlyStore<T> {
  getSnapshot(): T;
  subscribe(listener: () => void): UnsubscribeStoreType;
}
