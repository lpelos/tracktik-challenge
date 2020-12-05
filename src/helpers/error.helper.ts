import BaseError from "../errors/base.error";
import ErrorData from "../data-types/error-data";

export const errorToJSON = (error: Error): ErrorData =>
  error instanceof BaseError
    ? error.toJSON()
    : { code: "unidentified_error", message: error.message };
