// Source: https://gist.github.com/gbalbuena/3ec499535d435712ce16c1eced9f5502

let mockDelay;
let mockError;
let mockMethod = "GET";
let mockResponse = {
  get: jest.fn(),
  ok: true,
  status: 200,
  toError: jest.fn(),
};
let mockUrl;

let mockResponseBodies;
let responseBodiesIndex;

const Request = {
  get method() {
    return mockMethod;
  },
  get url() {
    return mockUrl;
  },
  accept: jest.fn().mockReturnThis(),
  catch: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  end: jest.fn().mockImplementation((callback) => {
    if (mockDelay) {
      this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);

      return;
    }

    callback(mockError, mockResponse);
  }),
  field: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  head: jest.fn().mockReturnThis(),
  patch: jest.fn().mockReturnThis(),
  post: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  redirects: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  then: (cb) =>
    new Promise((resolve, reject) => {
      if (typeof responseBodiesIndex !== "undefined") {
        responseBodiesIndex += 1;
        mockResponse.body = mockResponseBodies[responseBodiesIndex];
      }
      if (mockError) {
        reject(mockError);
      } else {
        resolve(cb(mockResponse));
      }
    }),
  timeout: jest.fn().mockReturnThis(),
  type: jest.fn().mockReturnThis(),
};

export const setMockDelay = (boolValue) => {
  mockDelay = boolValue;
};

export const setMockError = (err) => {
  mockError = err;
};

export const setMockMethod = (method) => {
  mockMethod = method;
};

export const setMockResponse = (res) => {
  mockResponse = res;
};

export const setMockResponseBodies = (bodies) => {
  mockResponseBodies = bodies;
  responseBodiesIndex = -1;
};

export const setMockResponseBody = (body) => {
  mockResponse.body = body;
  responseBodiesIndex = undefined;
};

export const setMockUrl = (url) => {
  mockUrl = url;
};

export default Request;
