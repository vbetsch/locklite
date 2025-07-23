import { HttpResponseDto } from '@shared/dto/responses/abstract/http.response.dto';

export class RequestService {
  public static async get<T>(url: string): Promise<T> {
    return await this._fetch<T>(url, { method: 'GET' });
  }

  public static async post<T>(url: string, body: unknown): Promise<T> {
    return await this._fetch<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public static async put<T>(url: string, body: unknown): Promise<T> {
    return await this._fetch<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public static async delete<T>(url: string): Promise<T> {
    return await this._fetch<T>(url, { method: 'DELETE' });
  }

  private static async _fetch<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      let message = 'Unexpected error';
      try {
        const errorJson: HttpResponseDto<unknown> = await response.json();
        message = errorJson?.error ?? message;
      } catch {
        message = await response.text();
      }
      throw new Error(message);
    }

    return response.json();
  }
}
