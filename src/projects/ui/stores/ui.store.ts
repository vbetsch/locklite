'use client';

import type { IStore } from './store';
import { createStore } from './store';

export type UiState = {
  readonly thisIsString: string;
  readonly thisIsArray: string[];
};

const initialUiState: UiState = {
  thisIsString: 'new',
  thisIsArray: ['first'],
};

export const uiStore: IStore<UiState> = createStore<UiState>(initialUiState);
