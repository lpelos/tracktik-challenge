import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import HttpClientError from "../../errors/http-client.error";

//#region Typings

export type HttpMethod = "GET";
export type HttpHeaders = { [key: string]: any };
export type HttpQueryParams = { [key: string]: any };

export type HttpRequestArgs = {
  headers?: HttpHeaders;
  query?: HttpQueryParams;
  url: string;
};

export interface HttpResponse<Body = any, Header = any> {
  body: Body;
  status: number;
  header: Header;
}

export interface HttpClientAdapter {
  get(opt: HttpRequestArgs): Observable<HttpResponse>;
}

interface HttpClientDependencies {
  adapter: HttpClientAdapter;
}

//#endregion Typings

export class HttpClient {
  private adapter: HttpClientAdapter;

  constructor({ adapter }: HttpClientDependencies) {
    this.adapter = adapter;
  }

  get<Body = any, Header = any>(
    args: HttpRequestArgs
  ): Observable<HttpResponse<Body, Header>> {
    return this.makeRequest("GET", args);
  }

  private makeRequest<Body = any, Header = any>(
    method: HttpMethod,
    args: HttpRequestArgs
  ): Observable<HttpResponse<Body, Header> | never> {
    let request$: Observable<HttpResponse<Body, Header>>;
    switch (method) {
      case "GET": {
        request$ = this.adapter.get(args);
        break;
      }
      default: {
        throw Error(`Unknown method HTTP method '${method}'`);
      }
    }

    return request$.pipe(catchError((err: any) => this.handleError(err)));
  }

  private handleError(err: any): Observable<never> {
    if (err instanceof HttpClientError) {
      // Possible improvements:
      // * handle and throw specific errors for specific situations (e.g., 401 unauthorized)
      // * send error data to an analytics service

      return throwError(err);
    }

    throw err;
  }
}

export default HttpClient;
