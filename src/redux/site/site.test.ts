import { ActionsObservable, StateObservable } from "redux-observable";
import { of, throwError } from "rxjs";

import { AppEpicDependencies, RootAction, RootState } from "../store";
import HttpClientError from "../../errors/http-client.error";
import SITE_DATA from "../../__fixtures__/site-data.fixture";
import siteReducer, {
  findSiteEpic,
  SITE_ACTION_TYPES,
  siteActions,
  SiteState,
} from ".";
import SiteRepository from "../../repositories/site";

describe("site reducer", () => {
  const siteId = "le-site-id";
  let initialState: SiteState;

  beforeEach(() => {
    initialState = { data: undefined, error: undefined, isRequesting: false };
  });

  describe("sync actions", () => {
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

  describe("async actions", () => {
    const site = SITE_DATA;

    let action$: ActionsObservable<RootAction>;
    let dependencies: AppEpicDependencies;
    let state$: StateObservable<RootState>;
    let siteRepositoryMock: SiteRepository;

    beforeEach(() => {
      siteRepositoryMock = { find: jest.fn(() => of(site)) } as any;

      dependencies = { siteRepository: siteRepositoryMock } as any;
      state$ = { value: { site: initialState } } as any;
    });

    describe("find site", () => {
      beforeEach(() => {
        action$ = of({
          type: SITE_ACTION_TYPES.FIND_REQUEST,
          payload: { id: siteId },
        }) as any;
      });

      test("handle request", (done) => {
        findSiteEpic(action$, state$, dependencies).subscribe(() => {
          expect(siteRepositoryMock.find).toHaveBeenCalledWith(siteId);
          done();
        });
      });

      test("dispatch success", (done) => {
        findSiteEpic(action$, state$, dependencies).subscribe((action) => {
          expect(action).toEqual({
            type: SITE_ACTION_TYPES.FIND_SUCCESS,
            payload: { site },
          });
          done();
        });
      });

      test("dispatch error", (done) => {
        const error = new HttpClientError({ message: "bad stuff happened" });
        siteRepositoryMock.find = jest.fn(() => throwError(error));
        findSiteEpic(action$, state$, dependencies).subscribe((action) => {
          expect(action).toEqual({
            type: SITE_ACTION_TYPES.FIND_FAILURE,
            payload: { error: error.toJSON() },
          });
          done();
        });
      });
    });
  });
});
