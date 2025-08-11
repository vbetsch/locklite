import { injectable } from 'tsyringe';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { GetUsersListDataDto } from '@shared/dto/output/data/get-users-list.data.dto';

@injectable()
export class MockUsersGateway {
  public async getUsersList(): Promise<
    RequestServiceOutputType<GetUsersListDataDto>
  > {}
}
