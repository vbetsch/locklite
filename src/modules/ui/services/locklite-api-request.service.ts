import { injectable } from 'tsyringe';
import { RequestService } from '@shared/services/abstract/request.service';
import { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { StatusCodes } from 'http-status-codes';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';

@injectable()
export class LockliteApiRequestService extends RequestService {
  protected override async _fetch<Data>(
    uri: string,
    options: RequestInit
  ): Promise<RequestServiceOutputType<Data>> {
    const response: Response = await fetch(`/api${uri}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    if (response.status === StatusCodes.NO_CONTENT) {
      return {
        status: StatusCodes.NO_CONTENT,
        // eslint-disable-next-line no-undefined
        data: undefined as unknown as Data,
      };
    }

    let message: string = 'Unexpected error';
    let responseBody: HttpResponseDto<Data>;
    try {
      responseBody = await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = 'An error occurred while parsing locklite API response';
      }
      UiLogger.error(`${message}: `, error);
      throw new Error(message);
    }

    if (!('data' in responseBody)) {
      if ('error' in responseBody) {
        throw new Error(responseBody.error);
      }
      message = 'An error occurred while parsing locklite API call.';
      UiLogger.error(`${message} Response: `, responseBody);
      throw new Error(message);
    }

    return { status: response.status, data: responseBody.data };
  }
}
