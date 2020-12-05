import { sitesActions } from "./sites";
import HttpClientError from "../../errors/http-client.error";
import SITE_DATA_LIST from "../../__fixtures__/site-data-list.fixture";
import sitesReducer, { SitesState } from ".";

describe("sites reducer", () => {
  const initialState: SitesState = {
    ids: [],
    isRequesting: false,
    listById: {},
  };

  test("returns the initial state", () => {
    const action = { type: "non_existent_action" } as any;
    expect(sitesReducer(undefined, action)).toEqual(initialState);
  });

  test("handles list request", () => {
    const action = sitesActions.listRequest();
    expect(sitesReducer(undefined, action)).toEqual({
      ...initialState,
      ids: [],
      isRequesting: true,
      listById: {},
    });
  });

  test("handles list cancel", () => {
    const action = sitesActions.listCancel();
    expect(sitesReducer(undefined, action).isRequesting).toBe(false);
  });

  test("handles list failure", () => {
    const error = new HttpClientError({ message: "bad stuff happened" });
    const action = sitesActions.listFailure(error);
    expect(sitesReducer(undefined, action)).toEqual({
      ...initialState,
      error: error.toJSON(),
    });
  });

  test("handles list success", () => {
    const sites = SITE_DATA_LIST;
    const action = sitesActions.listSuccess(sites);

    expect(sitesReducer(undefined, action)).toEqual({
      ...initialState,
      isRequesting: false,
      ids: sites.map((s) => s.id),
      listById: sites.reduce((acc, s) => ({ ...acc, [s.id]: s }), {}),
    });
  });
});
