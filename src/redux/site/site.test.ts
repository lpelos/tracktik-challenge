import HttpClientError from "../../errors/http-client.error";
import SITE_DATA from "../../__fixtures__/site-data.fixture";
import siteReducer, { siteActions, SiteState } from ".";

describe("site reducer", () => {
  const siteId = "le-site-id";
  let initialState: SiteState;

  beforeEach(() => {
    initialState = {
      data: undefined,
      error: undefined,
      isRequesting: false,
    };
  });

  test("return the initial state", () => {
    const action = { type: "non_existent_action" } as any;
    expect(siteReducer(initialState, action)).toEqual(initialState);
  });

  test("handles find request", () => {
    const action = siteActions.findRequest(siteId);
    expect(siteReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: true,
    });
  });

  test("handles find cancel", () => {
    const state = siteReducer(initialState, siteActions.findRequest(siteId));
    const action = siteActions.findCancel();
    expect(siteReducer(state, action).isRequesting).toBe(false);
  });

  test("handles find failure", () => {
    const state = siteReducer(initialState, siteActions.findRequest(siteId));
    const error = new HttpClientError({ message: "bad stuff happened" });
    const action = siteActions.findFailure(error);
    expect(siteReducer(state, action)).toEqual({
      ...initialState,
      error: error.toJSON(),
      isRequesting: false,
    });
  });

  test("handles find success", () => {
    const site = SITE_DATA;
    const state = siteReducer(initialState, siteActions.findRequest(site.id));
    const action = siteActions.findSuccess(site);
    expect(siteReducer(state, action)).toEqual({
      ...initialState,
      data: site,
    });
  });
});
