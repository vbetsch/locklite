import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

export type GetAllUsersResponseDto = HttpResponseDto<{
  users: UserModelDto[];
}>;
