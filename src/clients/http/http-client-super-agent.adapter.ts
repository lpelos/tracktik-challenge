import { Observable } from "rxjs";
import superagent, {
  Response as SuperagentResponse,
  ResponseError as SuperAgentResponseError,
  SuperAgentRequest,
} from "superagent";

import {
  HttpClientAdapter,
  HttpRequestArgs,
  HttpResponse,
} from "./http.client";
import HttpClientError, {
  HttpClientErrorDetails,
} from "../../errors/http-client.error";

interface HandleErrorOpt {
  error: SuperAgentResponseError;
  request: SuperAgentRequest;
}

export class HttpClientSuperAgentAdapter implements HttpClientAdapter {
  get({
    headers = {},
    query = {},
    url,
  }: HttpRequestArgs): Observable<HttpResponse | never> {
    const req = superagent
      .get(url)
      .set(headers)
      .query(query as object);

    return this.handleRequest(req);
  }

  private handleError({ error, request }: HandleErrorOpt): HttpClientError {
    const { method, url } = request;
    const { message, response } = error;
    let details: HttpClientErrorDetails = { method, url };

    if (!response) {
      return new HttpClientError({ details, message });
    }

    const { status, text } = response;
    details = { ...details, status };

    if (!text) {
      return new HttpClientError({ details, message });
    }

    let body: Record<string, any>;
    try {
      body = JSON.parse(text);
    } catch (e) {
      return new HttpClientError({ details, message });
    }

    return new HttpClientError({ details: { ...details, body }, message });
  }

  private handleRequest(request: SuperAgentRequest): Observable<HttpResponse> {
    return new Observable((observer) => {
      request
        .then((resp) => {
          observer.next(this.handleResponse(resp));
        })
        .catch((error) => {
          observer.error(this.handleError({ error, request }));
        })
        .finally(() => {
          observer.complete();
        });
    });
  }

  private handleResponse(resp: SuperagentResponse): HttpResponse {
    const { body, status, header } = resp;
    return { body, status, header };
  }
}

export default HttpClientSuperAgentAdapter;
