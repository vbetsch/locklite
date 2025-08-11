import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export const returnSuccessResultMock = (
  data: Data
): RequestServiceOutputType<Data> => {
  return {
    status: 200,
    data,
  };
};
