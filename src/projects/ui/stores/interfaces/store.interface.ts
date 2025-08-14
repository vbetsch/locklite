import type { IReadonlyStore } from '@ui/stores/interfaces/readonly.store.interface';

export interface IStore<T> extends IReadonlyStore<T> {
  setState(next: Partial<T> | ((prev: T) => Partial<T>)): void;
}
