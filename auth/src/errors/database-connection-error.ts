import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;

  // Constructor
  constructor() {
    super("Error connecting to db");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  // methods return array of errors
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
