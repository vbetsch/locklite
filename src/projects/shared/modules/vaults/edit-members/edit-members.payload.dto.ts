import type { UserModelDto } from '@shared/modules/users/user.model.dto';

export type EditMembersPayloadDto = {
  overrideMembers: Omit<UserModelDto, 'id'>[];
};
