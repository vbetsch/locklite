import { RequestService } from '@shared/services/request.service';
import { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';
import { injectable } from 'tsyringe';

@injectable()
export class UserGateway {
  public async getAll(): Promise<GetAllUsersResponseDto> {
    return await RequestService.get<GetAllUsersResponseDto>('/api/users');
  }
}
