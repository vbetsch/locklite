import type { UserModelDto } from '@shared/dto/models/user.model.dto';

export type EditMembersPayloadDto = {
  overrideMembers: Omit<UserModelDto, 'id'>[];
};
