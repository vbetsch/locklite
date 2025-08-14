import type { IStore } from '@ui/stores/interfaces/store.interface';
import { createStore } from '@ui/stores/hooks/createStore';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';

export type UsersStoreState = {
  allUsers: UserModelDto[];
  currentUser: UserModelDto | null;
  usersLoading: boolean;
};

const initialUiState: UsersStoreState = {
  allUsers: [],
  currentUser: null,
  usersLoading: false,
};

export const usersStore: IStore<UsersStoreState> =
  createStore<UsersStoreState>(initialUiState);
