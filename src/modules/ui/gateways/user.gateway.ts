import { RequestService } from '@shared/services/request.service';
import { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';

export class UserGateway {
  public static async getAll(): Promise<GetAllUsersResponseDto> {
    return await RequestService.get<GetAllUsersResponseDto>('/api/users');
  }
}
