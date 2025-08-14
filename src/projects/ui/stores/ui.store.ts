'use client';

// TODO: to delete

import type { IStore } from '@ui/stores/interfaces/store.interface';
import { createStore } from '@ui/stores/hooks/createStore';

export type UiState = {
  readonly thisIsString: string;
  readonly thisIsArray: string[];
};

const initialUiState: UiState = {
  thisIsString: 'new',
  thisIsArray: ['first'],
};

export const uiStore: IStore<UiState> = createStore<UiState>(initialUiState);
