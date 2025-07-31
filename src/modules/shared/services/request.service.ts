import { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';
import { injectable } from 'tsyringe';

@injectable()
export class RequestService {
  private readonly _baseApiUrl: string = '/api';

  private async _fetch<T>(uri: string, options: RequestInit): Promise<T> {
    const response: Response = await fetch(`${this._baseApiUrl}${uri}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      let message: string = 'Unexpected error';
      try {
        const errorJson: HttpResponseDto<T> = await response.json();
        message = errorJson?.error ?? message;
      } catch {
        message = await response.text();
      }
      throw new Error(message);
    }

    return response.json();
  }

  public async get<T>(uri: string): Promise<T> {
    return await this._fetch<T>(uri, { method: 'GET' });
  }

  public async post<T>(uri: string, body: unknown): Promise<T> {
    return await this._fetch<T>(uri, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<T>(uri: string, body: unknown): Promise<T> {
    return await this._fetch<T>(uri, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(uri: string): Promise<T> {
    return await this._fetch<T>(uri, { method: 'DELETE' });
  }
}
