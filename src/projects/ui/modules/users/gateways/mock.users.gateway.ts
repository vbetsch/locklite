import { injectable } from 'tsyringe';
import { MockRequestServiceOutputType } from '@ui/mocks/mock.request-service-output.type';

@injectable()
export class MockUsersGateway {
  public async getAllUsers(): Promise<MockRequestServiceOutputType> {}
}
