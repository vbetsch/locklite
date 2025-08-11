import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export const returnSuccessResultMock = <Data>(
  data: Data
): Promise<RequestServiceOutputType<Data>> => {
  const result: RequestServiceOutputType<Data> = {
    status: 200,
    data,
  };
  return Promise.resolve(result);
};
