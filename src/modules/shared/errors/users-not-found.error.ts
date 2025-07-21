import {HttpError} from "@shared/errors/http-error";

export class UsersNotFoundError extends HttpError {
  public constructor() {
    super('Users not found', 404)
  }
}
