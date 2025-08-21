import type { IStore } from '@ui/stores/interfaces/store.interface';
import { createStore } from '@ui/stores/hooks/createStore';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

export type VaultsStoreState = {
  vaults: VaultWithMembersModelDto[];
};

const initialState: VaultsStoreState = {
  vaults: [],
};

export const vaultsStore: IStore<VaultsStoreState> =
  createStore<VaultsStoreState>(initialState);
