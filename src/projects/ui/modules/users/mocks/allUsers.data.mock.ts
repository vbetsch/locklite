import type { UserModelDto } from '@shared/dto/models/user.model.dto';

export const allUsersDataMock: UserModelDto[] = [
  { id: 'u0', email: 'admin@example.com', name: 'Administrator' },
  { id: 'u1', email: 'alice.smith@example.com', name: 'Alice Smith' },
  { id: 'u2', email: 'bob.johnson@example.com', name: 'Bob Johnson' },
  { id: 'u3', email: 'charlie.davis@example.com' },
  { id: 'u4', email: 'diana.wilson@example.com', name: 'Diana Wilson' },
  { id: 'u5', email: 'edward.taylor@example.com', name: 'Edward Taylor' },
];
