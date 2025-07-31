import { injectable } from 'tsyringe';
import { RequestService } from '@shared/services/abstract/request.service';

@injectable()
export class LockliteApiRequestService extends RequestService {
  public constructor() {
    super('/api');
  }
}
