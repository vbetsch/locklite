'use client';

import { useSyncExternalStore } from 'react';

export type Unsubscribe = () => void;

export interface IReadOnlyStore<T> {
  getSnapshot(): T;
  subscribe(listener: () => void): Unsubscribe;
}

export interface IStore<T> extends IReadOnlyStore<T> {
  setState(next: Partial<T> | ((prev: T) => Partial<T>)): void;
}

export class LockLiteStore<T> implements IStore<T> {
  public constructor(initialState: T) {
    this._state = initialState;
  }

  public getSnapshot(): T {
    return this._state;
  }

  public subscribe(listener: () => void): Unsubscribe {
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

export function createStore<T>(initialState: T): IStore<T> {
  return new LockLiteStore<T>(initialState);
}

export function useStore<T>(store: IReadOnlyStore<T>): T {
  return useSyncExternalStore(
    (listener: () => void): Unsubscribe => store.subscribe(listener),
    (): T => store.getSnapshot(),
    (): T => store.getSnapshot()
  );
}
