import type { RequestServiceOutputType } from '@shared/requests/request-service-output.type';

export const returnSuccessResultMock = async <Data>(
  data: Data,
  delayMs: number = 0
): Promise<RequestServiceOutputType<Data>> => {
  const result: RequestServiceOutputType<Data> = {
    status: 200,
    data,
  };
  await new Promise<void>(resolve => setTimeout(resolve, delayMs));
  return result;
};
