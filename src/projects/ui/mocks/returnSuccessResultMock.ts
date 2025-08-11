import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export const returnSuccessResultMock = async (
  data: Data
): Promise<RequestServiceOutputType<Data>> => {
  return await new Promise<Data>({
    status: 200,
    data,
  });
};
