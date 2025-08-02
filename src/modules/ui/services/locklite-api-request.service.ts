import { injectable } from 'tsyringe';
import { RequestService } from '@shared/services/abstract/request.service';
import { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

@injectable()
export class LockliteApiRequestService extends RequestService {
  protected override async _retrieve<Data>(
    uri: string,
    options: RequestInit
  ): Promise<Data> {
    const response: Response = await this._fetch(`/api${uri}`, options);

    let message: string = 'Unexpected error';
    let responseData: HttpResponseDto<Data>;
    try {
      responseData = await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = 'An error occurred while locklite API errors';
      }
      console.error(`${message}: `, error);
      throw new Error(message);
    }

    if (!('data' in responseData)) {
      if ('error' in responseData) {
        throw new Error(responseData.error);
      }
      message = 'An error occurred while parsing locklite API call.';
      console.error(`${message} Response: `, responseData);
      throw new Error(message);
    }

    return responseData.data;
  }
}
