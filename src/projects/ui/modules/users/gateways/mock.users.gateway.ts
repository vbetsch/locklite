import { injectable } from 'tsyringe';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { GetUsersListDataDto } from '@shared/dto/output/data/auth/get-users-list.data.dto';
import { returnSuccessResultMock } from '@ui/mocks/returnSuccessResultMock';
import { IUsersGateway } from '@ui/modules/users/gateways/abstract/users.gateway.interface';
import { allUsersDataMock } from '@ui/modules/users/mocks/allUsers.data.mock';

@injectable()
export class MockUsersGateway implements IUsersGateway {
  public async getUsersList(): Promise<
    RequestServiceOutputType<GetUsersListDataDto>
  > {
    return await returnSuccessResultMock(
      {
        allUsers: allUsersDataMock,
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      5000
    );
  }
}
