export type FetchResponse = {
  response: Response;
  body: unknown | null;
};

export abstract class RequestService {
  protected async _request(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    return await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });
  }

  protected async _fetch(
    url: string,
    options: RequestInit
  ): Promise<FetchResponse> {
    const response: Response = await this._request(url, options);

    if (!response.ok) {
      let message: string = 'Unexpected error';
      try {
        // eslint-disable-next-line @typescript-eslint/typedef
        const errorJson = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message = errorJson?.error ?? message;
      } catch {
        message = await response.text();
      }
      throw new Error(message);
    }

    return { response: response, body: null };
  }

  protected async _execute(url: string, options: RequestInit): Promise<void> {
    await this._fetch(url, options);
  }

  protected async _retrieveJson<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const fetchResponse: FetchResponse = await this._fetch(url, options);
    return fetchResponse.response.json();
  }

  public async get<T>(url: string): Promise<T> {
    return await this._retrieveJson<T>(url, { method: 'GET' });
  }

  public async post<T>(url: string, body: unknown): Promise<T> {
    return await this._retrieveJson<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body: unknown): Promise<T> {
    return await this._retrieveJson<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete(url: string): Promise<void> {
    await this._execute(url, {
      method: 'DELETE',
    });
  }
}
