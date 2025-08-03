export class HttpError extends Error {
  public readonly status: number;

  public constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }

  public override toString(): string {
    return `(${this.status}) ${this.message}`;
  }
}
