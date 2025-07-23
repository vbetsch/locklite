import { RequestService } from '@shared/services/request.service';
import { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserGateway {
  public constructor(
    @inject(RequestService) private readonly _requestService: RequestService
  ) {}

  public async getAll(): Promise<GetAllUsersResponseDto> {
    return await this._requestService.get<GetAllUsersResponseDto>('/api/users');
  }
}
