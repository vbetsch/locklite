import type { IStore } from '@ui/stores/interfaces/store.interface';
import type { UnsubscribeStoreType } from '@ui/stores/unsubscribe.store.type';

export class AppStore<T> implements IStore<T> {
  public constructor(initialState: T) {
    this._state = initialState;
  }

  public getSnapshot(): T {
    return this._state;
  }

  public subscribe(listener: () => void): UnsubscribeStoreType {
    this._listeners.add(listener);
    return (): void => {
      this._listeners.delete(listener);
    };
  }

  public setState(next: Partial<T> | ((prev: T) => Partial<T>)): void {
    const patch: Partial<T> =
      typeof next === 'function'
        ? (next as (prev: T) => Partial<T>)(this._state)
        : next;
    this._state = { ...this._state, ...patch } as T;
    this._emit();
  }

  public get state(): T {
    return this._state;
  }

  private _state: T;
  private readonly _listeners: Set<() => void> = new Set();

  private _emit(): void {
    for (const l of this._listeners) l();
  }
}
