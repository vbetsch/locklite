import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import type { GetUsersListDataDto } from '@shared/dto/output/data/get-users-list.data.dto';

export interface IUsersGateway {
  getUsersList(): Promise<RequestServiceOutputType<GetUsersListDataDto>>;
}
