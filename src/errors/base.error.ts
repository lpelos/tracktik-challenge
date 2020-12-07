import ErrorData from '../data-types/error-data';

//#region Typings

export type BaseErrorDetails = Record<string, any>;

export interface BaseErrorAttributes {
  code?: string;
  details?: BaseErrorDetails;
  message?: string;
}

//#endregion Typings

export class BaseError extends Error implements BaseError {
  code: string;
  details?: BaseErrorDetails;

  constructor({
    code = 'unknown_error',
    details,
    message,
  }: BaseErrorAttributes) {
    super(message);

    Error.call(this, message);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }

    this.code = code;
    this.details = details;
  }

  toJSON(): ErrorData {
    return {
      code: this.code,
      details: this.details,
      message: this.message,
    };
  }

  toString(): string {
    const details = this.details
      ? `\ndetails: ${JSON.stringify(this.details)}`
      : '';

    return `Error: ${this.message}${details}`;
  }
}

export default BaseError;
