import 'reflect-metadata';
import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';
import { RequestService } from '@shared/requests/request.service';

describe('RequestService', () => {
  let service: RequestService;
  let fetchMock: jest.MockedFunction<
    (input: RequestInfo, init?: RequestInit) => Promise<Response>
  >;

  const OK_STATUS: number = 200;
  const CREATED_STATUS: number = 201;
  const BAD_REQUEST_STATUS: number = 400;
  const BAD_GATEWAY_STATUS: number = 502;

  beforeEach((): void => {
    service = new RequestService();
  });

  afterEach((): void => {
    jest.resetAllMocks();
  });

  it('should fetch with GET and return status and data', async (): Promise<void> => {
    type Data = { foo: string };
    const data: Data = { foo: 'bar' };
    const mockResponse: Response = {
      ok: true,
      status: OK_STATUS,
      json: jest.fn((): Promise<Data> => Promise.resolve(data)),
      headers: new Headers(),
      statusText: 'OK',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    const result: RequestServiceOutputType<Data> = await service.get<Data>(
      'http://example.com/resource'
    );

    expect(fetchMock).toHaveBeenCalledWith('http://example.com/resource', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ status: OK_STATUS, data });
  });

  it('should fetch with POST and return status and data', async (): Promise<void> => {
    type Data = { id: number };
    const bodyPayload: { name: string } = { name: 'Alice' };
    const data: Data = { id: 1 };
    const mockResponse: Response = {
      ok: true,
      status: CREATED_STATUS,
      json: jest.fn((): Promise<Data> => Promise.resolve(data)),
      headers: new Headers(),
      statusText: 'Created',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    const result: RequestServiceOutputType<Data> = await service.post<Data>(
      'http://api.test/items',
      bodyPayload
    );

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/items', {
      method: 'POST',
      body: JSON.stringify(bodyPayload),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ status: CREATED_STATUS, data });
  });

  it('should fetch with PUT and return status and data', async (): Promise<void> => {
    type Data = { updated: boolean };
    const bodyPayload: { value: number } = { value: 42 };
    const data: Data = { updated: true };
    const mockResponse: Response = {
      ok: true,
      status: OK_STATUS,
      json: jest.fn((): Promise<Data> => Promise.resolve(data)),
      headers: new Headers(),
      statusText: 'OK',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    const result: RequestServiceOutputType<Data> = await service.put<Data>(
      'http://api.test/items/1',
      bodyPayload
    );

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/items/1', {
      method: 'PUT',
      body: JSON.stringify(bodyPayload),
      headers: { 'Content-Type': 'application/json' },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ status: OK_STATUS, data });
  });

  it('should fetch with DELETE and return status only', async (): Promise<void> => {
    type Data = { deleted: boolean };
    const data: Data = { deleted: true };
    const mockResponse: Response = {
      ok: true,
      status: OK_STATUS,
      json: jest.fn((): Promise<Data> => Promise.resolve(data)),
      headers: new Headers(),
      statusText: 'OK',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    const result: number = await service.delete<Data>(
      'http://api.test/items/1'
    );

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/items/1', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(OK_STATUS);
  });

  it('should throw error with JSON message when response not ok and JSON contains error', async (): Promise<void> => {
    const errorMessage: string = 'Validation failed';
    const errorJson: { error: string } = { error: errorMessage };
    const mockResponse: Response = {
      ok: false,
      status: BAD_REQUEST_STATUS,
      json: jest.fn(
        (): Promise<{ error: string }> => Promise.resolve(errorJson)
      ),
      text: jest.fn(),
      headers: new Headers(),
      statusText: 'Bad Request',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    await expect(service.get<unknown>('http://api.test/fail')).rejects.toThrow(
      errorMessage
    );
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should throw error with text message when response not ok and JSON parsing fails', async (): Promise<void> => {
    const textMessage: string = 'Server down';
    const mockResponse: Response = {
      ok: false,
      status: BAD_GATEWAY_STATUS,
      json: jest.fn(
        (): Promise<unknown> => Promise.reject(new Error('Invalid JSON'))
      ),
      text: jest.fn((): Promise<string> => Promise.resolve(textMessage)),
      headers: new Headers(),
      statusText: 'Bad Gateway',
      redirected: false,
      type: 'default',
      url: '',
      clone: (): Response => mockResponse,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Response;
    fetchMock = jest.fn((): Promise<Response> => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    await expect(
      service.delete<unknown>('http://api.test/error')
    ).rejects.toThrow(textMessage);
    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockResponse.text).toHaveBeenCalled();
  });
});
