import { injectable } from 'tsyringe';
import { RequestService } from '@shared/services/request.service';
import { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { StatusCodes } from 'http-status-codes';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';
import { HttpError } from '@shared/errors/http-error';
import { BusinessError } from '@shared/errors/business-error';

@injectable()
export class LockliteApiRequestService extends RequestService {
  private handleNoDataCase<Data>(): RequestServiceOutputType<Data> {
    return {
      status: StatusCodes.NO_CONTENT,
      // eslint-disable-next-line no-undefined
      data: undefined as unknown as Data,
    };
  }

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
      return this.handleNoDataCase<Data>();
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
        if ('code' in responseBody.error && responseBody.error.code) {
          throw new BusinessError(
            responseBody.error.message,
            response.status,
            responseBody.error.code
          );
        }
        throw new HttpError(responseBody.error.message, response.status);
      }
      message = 'An error occurred while parsing locklite API call.';
      UiLogger.error(`${message} Response: `, responseBody);
      throw new Error(message);
    }

    return { status: response.status, data: responseBody.data };
  }
}
