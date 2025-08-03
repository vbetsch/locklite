import { injectable } from 'tsyringe';
import { RequestService } from '@shared/requests/request.service';
import { HttpResponseDto } from '@shared/dto/output/responses/abstract/http.response.dto';
import { StatusCodes } from 'http-status-codes';
import { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { UiLogger } from '@ui/logs/ui.logger';
import { HttpError } from '@shared/errors/http-error';
import { BusinessError } from '@shared/errors/business-error';

@injectable()
export class LockliteApiRequestService extends RequestService {
  private readonly _baseUrl: string = '/api';

  private _returnStatusWithoutData<Data>(): RequestServiceOutputType<Data> {
    return {
      status: StatusCodes.NO_CONTENT,
      // eslint-disable-next-line no-undefined
      data: undefined as unknown as Data,
    };
  }

  private _handleParseError(error: unknown): never {
    const message: string =
      error instanceof Error
        ? error.message
        : 'An error occurred while parsing locklite API response';
    UiLogger.error(`${message}: `, error);
    throw new Error(message);
  }

  private async _parseBody<Data>(
    response: Response
  ): Promise<HttpResponseDto<Data>> {
    try {
      return await response.json();
    } catch (error: unknown) {
      this._handleParseError(error);
    }
  }

  private _handleNoDataInBody<Data>(
    response: Response,
    responseBody: HttpResponseDto<Data>
  ): never {
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
    this._errorMessage = 'An error occurred while parsing locklite API call.';
    UiLogger.error(`${this._errorMessage} Response: `, responseBody);
    throw new Error(this._errorMessage);
  }

  protected override async _request<Data>(
    uri: string,
    options: RequestInit
  ): Promise<RequestServiceOutputType<Data>> {
    const response: Response = await this._fetch(
      `${this._baseUrl}${uri}`,
      options
    );

    if (response.status === StatusCodes.NO_CONTENT) {
      return this._returnStatusWithoutData<Data>();
    }

    const responseBody: HttpResponseDto<Data> =
      await this._parseBody<Data>(response);

    if (!('data' in responseBody))
      this._handleNoDataInBody<Data>(response, responseBody);

    return { status: response.status, data: responseBody.data };
  }
}
