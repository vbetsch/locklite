export abstract class HttpError extends Error {
  public readonly status: number

  protected constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}
