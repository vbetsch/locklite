export interface IUseCase<Output> {
  handle(): Promise<Output>;
}
