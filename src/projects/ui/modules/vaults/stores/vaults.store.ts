import type { IStore } from '@ui/stores/interfaces/store.interface';
import { createStore } from '@ui/stores/hooks/createStore';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

export type UsersStoreState = {
  vaults: VaultWithMembersModelDto[];
};

const initialState: UsersStoreState = {
  vaults: [],
};

export const vaultsStore: IStore<UsersStoreState> =
  createStore<UsersStoreState>(initialState);
