import type { UserModelDto } from '@shared/modules/users/user.model.dto';

export type VaultMemberModelDto = Omit<UserModelDto, 'id'>;
