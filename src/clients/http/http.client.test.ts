import { of } from "rxjs";

import HttpClient, { HttpClientAdapter } from ".";

describe("HttpClient", () => {
  let adapterMock: HttpClientAdapter;

  beforeEach(() => {
    adapterMock = { get: jest.fn(() => of()) };
  });

  test("should initialize without crashing", () => {
    const client = new HttpClient({ adapter: adapterMock });
    expect(client).toBeTruthy();
  });

  test("#get", () => {
    const client = new HttpClient({ adapter: adapterMock });

    const headers = { "Content-Type": "application/json" };
    const query = { "page": 1 };
    const url = "http://example.com";

    client.get({ headers, query, url });

    expect(adapterMock.get).toHaveBeenCalledWith({ headers, query, url });
  });
});
