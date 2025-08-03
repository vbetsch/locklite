import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export abstract class RequestService {
  protected _errorMessage: string = 'Unexpected error';

  protected async _fetch(url: string, options: RequestInit): Promise<Response> {
    return await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });
  }

  protected async _handleResponseNotOk(response: Response): Promise<never> {
    try {
      // eslint-disable-next-line @typescript-eslint/typedef
      const errorJson = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this._errorMessage = errorJson?.error ?? this._errorMessage;
    } catch {
      this._errorMessage = await response.text();
    }
    throw new Error(this._errorMessage);
  }

  protected async _request<T>(
    url: string,
    options: RequestInit
  ): Promise<RequestServiceOutputType<T>> {
    const response: Response = await this._fetch(url, options);
    if (!response.ok) await this._handleResponseNotOk(response);
    return { status: response.status, data: await response.json() };
  }

  public async get<T>(url: string): Promise<RequestServiceOutputType<T>> {
    return await this._request<T>(url, { method: 'GET' });
  }

  public async post<T>(
    url: string,
    body: unknown
  ): Promise<RequestServiceOutputType<T>> {
    return await this._request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<T>(
    url: string,
    body: unknown
  ): Promise<RequestServiceOutputType<T>> {
    return await this._request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(url: string): Promise<number> {
    const output: RequestServiceOutputType<T> = await this._request<T>(url, {
      method: 'DELETE',
    });
    return output.status;
  }
}
