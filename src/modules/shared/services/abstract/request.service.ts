export abstract class RequestService {
  protected async _fetch<T>(url: string, options: RequestInit): Promise<T> {
    const response: Response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

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

    return await response.json();
  }

  public async get<T>(url: string): Promise<T> {
    return await this._fetch<T>(url, { method: 'GET' });
  }

  public async post<T>(url: string, body: unknown): Promise<T> {
    return await this._fetch<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<T>(url: string, body: unknown): Promise<T> {
    return await this._fetch<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete(url: string): Promise<void> {
    await this._fetch<void>(url, {
      method: 'DELETE',
    });
  }
}
