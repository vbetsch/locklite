import type { UserModelDto } from '@shared/modules/users/user.model.dto';

//TODO: add swagger documentation
export type GetUsersListDataDto = {
  allUsers: UserModelDto[];
};
