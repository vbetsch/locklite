export interface IUseCaseWithInput<Input, Output> {
  handle(input: Input): Promise<Output>;
}
