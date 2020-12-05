import { ResponseError } from "superagent";

// eslint-disable-next-line jest/no-mocks-import
import {
  setMockError,
  setMockMethod,
  setMockResponse,
  setMockUrl,
} from "../../__mocks__/superagent";

import { HttpClientSuperAgentAdapter } from ".";
import HttpClientError from "../../errors/http-client.error";

describe("HttpClientSuperAgentAdapter", () => {
  let adapter: HttpClientSuperAgentAdapter;

  beforeEach(() => {
    adapter = new HttpClientSuperAgentAdapter();
  });

  test("should initialize without crashing", () => {
    expect(adapter).toBeTruthy();
  });

  describe("#get", () => {
    const headers = { "Content-Type": "application/json" };
    const method = "GET";
    const query = { page: 1 };
    const url = "http://example.com";

    test("success", (done) => {
      const responseBody = { data: "a cool response" };
      const response = { body: responseBody, status: 200, header: {} };

      setMockResponse(response);

      adapter.get({ headers, query, url }).subscribe((resp) => {
        expect(resp).toEqual(response);
        done();
      });
    });

    describe("error", () => {
      const errorCode = "http_client_error";
      const errorMessage = "something wrong is not write";
      const errorName = "bad error";
      const errorResponseBody = { foo: "bar" };
      const errorResponseBodyText = JSON.stringify(errorResponseBody);
      const errorResponseStatus = 500;

      beforeEach(() => {
        setMockMethod(method);
        setMockUrl(url);
      });

      test("with no reponse", (done) => {
        const error: ResponseError = { message: errorMessage, name: errorName };

        setMockError(error);

        adapter.get({ headers, query, url }).subscribe({
          error: (error: HttpClientError) => {
            expect(error).toBeInstanceOf(HttpClientError);
            expect(error.code).toBe(errorCode);
            expect(error.message).toBe(errorMessage);
            expect(error.details).toEqual({ method, url });
            done();
          },
        });
      });

      test("with no reponse text", (done) => {
        const error: ResponseError = {
          message: errorMessage,
          name: errorName,
          response: { status: errorResponseStatus } as any,
        };

        setMockError(error);

        adapter.get({ headers, query, url }).subscribe({
          error: (error: HttpClientError) => {
            expect(error).toBeInstanceOf(HttpClientError);
            expect(error.code).toBe(errorCode);
            expect(error.message).toBe(errorMessage);
            expect(error.details).toEqual({
              method,
              status: errorResponseStatus,
              url,
            });
            done();
          },
        });
      });

      test("with reponse text", (done) => {
        const error: ResponseError = {
          message: errorMessage,
          name: errorName,
          response: {
            status: errorResponseStatus,
            text: errorResponseBodyText,
          } as any,
        };

        setMockError(error);

        adapter.get({ headers, query, url }).subscribe({
          error: (error: HttpClientError) => {
            expect(error).toBeInstanceOf(HttpClientError);
            expect(error.code).toBe(errorCode);
            expect(error.message).toBe(errorMessage);
            expect(error.details).toEqual({
              body:  errorResponseBody,
              method,
              status: errorResponseStatus,
              url,
            });
            done();
          },
        });
      });
    });
  });
});
