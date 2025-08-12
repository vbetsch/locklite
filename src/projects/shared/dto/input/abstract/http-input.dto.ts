export type HttpInputDto<TParams, TPayload = null> = {
  params: TParams;
  payload: TPayload;
};
