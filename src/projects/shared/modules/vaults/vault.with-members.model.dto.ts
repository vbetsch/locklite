import type { UserModelDto } from '@shared/modules/users/user.model.dto';

// TODO: To migrate in VaultModelDto
export type VaultWithMembersModelDto = {
  id: string;
  label: string;
  secret: string;
  members: Omit<UserModelDto, 'id'>[];
};
