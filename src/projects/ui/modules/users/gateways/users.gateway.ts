import { IUsersGateway } from '@ui/modules/users/gateways/abstract/users.gateway.interface';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { GetUsersListDataDto } from '@shared/modules/users/get-users-list.data.dto';
import { inject, injectable } from 'tsyringe';
import { LockliteApiRequestService } from '@ui/services/locklite-api-request.service';

@injectable()
export class UsersGateway implements IUsersGateway {
  public constructor(
    @inject(LockliteApiRequestService)
    private readonly _lockliteRequestService: LockliteApiRequestService
  ) {}

  public async getUsersList(): Promise<
    RequestServiceOutputType<GetUsersListDataDto>
  > {
    return await this._lockliteRequestService.get<GetUsersListDataDto>(
      '/users'
    );
  }
}
