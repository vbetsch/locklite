import type { UserModelDto } from '@shared/dto/models/user.model.dto';

//TODO: add swagger documentation
export type GetUsersListDataDto = {
  allUsers: UserModelDto[];
};
