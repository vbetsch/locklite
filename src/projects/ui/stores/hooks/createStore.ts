import type { IStore } from '@ui/stores/interfaces/store.interface';
import { AppStore } from '@ui/stores/app.store';

export function createStore<T>(initialState: T): IStore<T> {
  return new AppStore<T>(initialState);
}
