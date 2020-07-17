import { CustomError } from "./custom-error";

export class NotFoundErrors extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route Not found");
    Object.setPrototypeOf(this, NotFoundErrors.prototype);
  }
  serializeErrors() {
    return [{ message: "Not found" }];
  }
}
