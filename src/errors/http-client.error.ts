import BaseError, { BaseErrorAttributes } from "./base.error";

// #region Typings

export interface HttpClientErrorDetails {
  body?: Record<string, any>;
  method?: string;
  status?: number;
  url?: string;
}

export interface HttpClientErrorAttributes extends BaseErrorAttributes {
  details?: HttpClientErrorDetails;
}

// #region Typings

export class HttpClientError extends BaseError
  implements HttpClientErrorAttributes {
  details?: HttpClientErrorDetails;

  constructor({
    code = "http_client_error",
    details,
    message,
  }: HttpClientErrorAttributes) {
    super({ code, message });
    this.details = details;
  }
}

export default HttpClientError;
