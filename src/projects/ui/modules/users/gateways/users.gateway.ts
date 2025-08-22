import { IUsersGateway } from '@ui/modules/users/gateways/abstract/users.gateway.interface';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { GetUsersListDataDto } from '@shared/modules/users/get-users-list.data.dto';
import { inject, injectable } from 'tsyringe';
import { InternalApiRequestService } from '@ui/services/internal-api-request.service';

@injectable()
export class UsersGateway implements IUsersGateway {
  public constructor(
    @inject(InternalApiRequestService)
    private readonly _internalApiRequestService: InternalApiRequestService
  ) {}

  public async getUsersList(): Promise<
    RequestServiceOutputType<GetUsersListDataDto>
  > {
    return await this._internalApiRequestService.get<GetUsersListDataDto>(
      '/users'
    );
  }
}
