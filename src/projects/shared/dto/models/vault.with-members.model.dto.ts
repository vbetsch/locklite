import type { UserModelDto } from '@shared/dto/models/user.model.dto';

// TODO: To move in VaultModelDto
export type VaultWithMembersModelDto = {
  id: string;
  label: string;
  secret: string;
  members: Omit<UserModelDto, 'id'>[];
};
