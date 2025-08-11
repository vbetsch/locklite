import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export const returnSuccessResultMock = (
  data: Data
): Promise<RequestServiceOutputType<Data>> => {
  const result: RequestServiceOutputType<TData> = {
    status: 200,
    data,
  };
  return Promise.resolve(result);
};
