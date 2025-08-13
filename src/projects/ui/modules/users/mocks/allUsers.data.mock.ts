import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import { currentUserDataMock } from '@ui/modules/users/mocks/currentUser.data.mock';

export const allUsersDataMock: UserModelDto[] = [
  currentUserDataMock,
  { id: 'u1', email: 'alice.smith@example.com', name: 'Alice Smith' },
  { id: 'u2', email: 'bob.johnson@example.com', name: 'Bob Johnson' },
  { id: 'u3', email: 'charlie.davis@example.com' },
  { id: 'u4', email: 'diana.wilson@example.com', name: 'Diana Wilson' },
  { id: 'u5', email: 'edward.taylor@example.com', name: 'Edward Taylor' },
  { id: 'u6', email: 'frank.moore@example.com', name: 'Frank Moore' },
  { id: 'u7', email: 'grace.miller@example.com', name: 'Grace Miller' },
  { id: 'u8', email: 'henry.anderson@example.com' },
  { id: 'u9', email: 'isabella.thomas@example.com', name: 'Isabella Thomas' },
  { id: 'u10', email: 'jackson.white@example.com', name: 'Jackson White' },
  { id: 'u11', email: 'karen.harris@example.com', name: 'Karen Harris' },
  { id: 'u12', email: 'liam.martin@example.com' },
  { id: 'u13', email: 'mia.lee@example.com', name: 'Mia Lee' },
  { id: 'u14', email: 'nathan.king@example.com', name: 'Nathan King' },
];
