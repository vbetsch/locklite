import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import { currentUserDataMock } from '@ui/modules/users/mocks/currentUser.data.mock';

export const allUsersDataMock: UserModelDto[] = [
  currentUserDataMock,
  { id: 'u1', email: 'alice.smith@example.com', name: 'Alice Smith' },
  { id: 'u2', email: 'bob.johnson@example.com', name: 'Bob Johnson' },
  { id: 'u3', email: 'charlie.davis@example.com' },
  { id: 'u4', email: 'diana.wilson@example.com', name: 'Diana Wilson' },
  { id: 'u5', email: 'edward.taylor@example.com', name: 'Edward Taylor' },
];
