export interface IUseCaseWithInput<Input, Output> {
  handle(params: Input): Promise<Output>;
}
