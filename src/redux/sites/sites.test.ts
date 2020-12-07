import HttpClientError from "../../errors/http-client.error";
import SITE_DATA_LIST from "../../__fixtures__/site-data-list.fixture";
import sitesReducer, { sitesActions, SitesState } from ".";

describe("sites reducer", () => {
  let initialState: SitesState;

  beforeEach(() => {
    initialState = {
      hasMore: true,
      ids: [],
      isRequesting: false,
      listById: {},
      page: 1,
      pageSize: 2,
    };
  })

  test("returns the initial state", () => {
    const action = { type: "non_existent_action" } as any;
    expect(sitesReducer(initialState, action)).toEqual(initialState);
  });

  test("handles list request", () => {
    const action = sitesActions.listRequest();
    expect(sitesReducer(initialState, action)).toEqual({
      ...initialState,
      ids: [],
      isRequesting: true,
      listById: {},
    });
  });

  test("handles list request more", () => {
    const action = sitesActions.listRequestMore();
    expect(sitesReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: true,
      page: initialState.page + 1,
    });
  });

  test("handles list cancel", () => {
    const state = sitesReducer(initialState, sitesActions.listRequest());
    const action = sitesActions.listCancel();
    expect(sitesReducer(state, action).isRequesting).toBe(false);
  });

  test("handles list failure", () => {
    const state = sitesReducer(initialState, sitesActions.listRequest());
    const error = new HttpClientError({ message: "bad stuff happened" });
    const action = sitesActions.listFailure(error);
    expect(sitesReducer(state, action)).toEqual({
      ...initialState,
      error: error.toJSON(),
      isRequesting: false,
    });
  });

  describe("handles list success", () => {
    let state: SitesState;
    beforeEach(() => {
      state = sitesReducer(initialState, sitesActions.listRequest());
    });

    test("default", () => {
      const sites = SITE_DATA_LIST.slice(0, initialState.pageSize);
      const action = sitesActions.listSuccess(sites);

      expect(sitesReducer(state, action)).toEqual({
        ...initialState,
        hasMore: true,
        isRequesting: false,
        ids: sites.map((s) => s.id),
        listById: sites.reduce((acc, s) => ({ ...acc, [s.id]: s }), {}),
      });
    });

    describe("end of the list", () => {
      test("incomplete data", () => {
        const sites = SITE_DATA_LIST.slice(0, 1);
        const action = sitesActions.listSuccess(sites);

        expect(sitesReducer(state, action)).toEqual({
          ...initialState,
          hasMore: false,
          isRequesting: false,
          ids: sites.map((s) => s.id),
          listById: sites.reduce((acc, s) => ({ ...acc, [s.id]: s }), {}),
        });
      });

      test("empty page", () => {
        const action = sitesActions.listSuccess([]);

        expect(sitesReducer(state, action)).toEqual({
          ...initialState,
          hasMore: false,
          isRequesting: false,
        });
      });
    });
  });
});
