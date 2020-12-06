import { action, ActionType, isOfType } from "typesafe-actions";
import { catchError, filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { keyBy } from "lodash";
import { of } from "rxjs";

import { AppEpic, RootAction, RootState } from "../store";
import { errorToJSON } from "../../helpers/error.helper";
import ErrorData from "../../data-types/error-data";
import SiteData from "../../data-types/site-data";

//#region Actions

//#region public List Actions
const LIST_CANCEL = "sites/list_cancel";
const listCancelAction = () => action(LIST_CANCEL);

const LIST_FAILURE = "sites/list_failure";
const listFailureAction = (error: Error) =>
  action(LIST_FAILURE, { error: errorToJSON(error) });

const LIST_REQUEST = "sites/list_request";
const listRequestAction = () => action(LIST_REQUEST);

const LIST_REQUEST_MORE = "sites/list_request_more";
const listRequestMoreAction = () => action(LIST_REQUEST_MORE);

const LIST_SUCCESS = "sites/list_success";
const listSuccessAction = (sites: SiteData[]) =>
  action(LIST_SUCCESS, { sites });
//#endregion public List Actions

export const SITES_ACTION_TYPES = {
  LIST_CANCEL,
  LIST_FAILURE,
  LIST_REQUEST,
  LIST_REQUEST_MORE,
  LIST_SUCCESS,
};

export const sitesActions = {
  listCancel: listCancelAction,
  listFailure: listFailureAction,
  listRequest: listRequestAction,
  listRequestMore: listRequestMoreAction,
  listSuccess: listSuccessAction,
};

export type SitesAction = ActionType<typeof sitesActions>;

//#endregion Actions

//#region Selectors

const selectSitesListSate = (rootState: RootState) => rootState.sites;

export const selectSitesList = (rootState: RootState) => {
  const state = selectSitesListSate(rootState);
  return state.ids.map((id) => state.listById[id]);
};

export const selectSitesListError = (rootState: RootState) => {
  const state = selectSitesListSate(rootState);
  return state.error;
};

export const selectSitesHasMore = (rootState: RootState) => {
  const state = selectSitesListSate(rootState);
  return state.hasMore;
};

export const selectSitesListIsRequesting = (rootState: RootState) => {
  const state = selectSitesListSate(rootState);
  return state.isRequesting;
};

//#endregion Selectors

//#region Reducers

export interface SitesState {
  error?: ErrorData;
  hasMore: boolean;
  ids: SiteData["id"][];
  isRequesting: boolean;
  listById: Record<SiteData["id"], SiteData>;
  page: number;
  pageSize: number;
}

const initialState: SitesState = {
  ids: [],
  hasMore: true,
  isRequesting: false,
  listById: {},
  page: 1,
  pageSize: 10,
};

const sitesReducer = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case LIST_CANCEL: {
      return { ...state, isRequesting: false };
    }
    case LIST_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, isRequesting: false };
    }
    case LIST_REQUEST: {
      return {
        ...state,
        error: undefined,
        ids: [],
        isRequesting: true,
        listById: {},
        page: 1,
      };
    }
    case LIST_REQUEST_MORE: {
      return {
        ...state,
        error: undefined,
        isRequesting: true,
        page: state.page + 1,
      };
    }
    case LIST_SUCCESS: {
      const { sites } = action.payload;
      const newIds = sites.map((s) => s.id);
      const newListByIds = keyBy(sites, "id");

      return {
        ...state,
        hasMore: sites.length >= state.pageSize,
        ids: [...state.ids, ...newIds],
        isRequesting: false,
        listById: { ...state.listById, ...newListByIds },
      };
    }
    default: {
      return state;
    }
  }
};

//#endregion Reducers

//#region Epics

const listEpic: AppEpic = (action$, state$, { siteRepository }) =>
  action$.pipe(
    filter(isOfType([LIST_REQUEST, LIST_REQUEST_MORE])),
    mergeMap(() => {
      const { page, pageSize: limit } = state$.value.sites;
      return siteRepository.list({ limit, page }).pipe(
        takeUntil(action$.pipe(filter(isOfType(LIST_CANCEL)))),
        map((sites) => listSuccessAction(sites)),
        catchError((error) => of(listFailureAction(error)))
      );
    })
  );

export const sitesEpics = combineEpics(listEpic);

//#endregion Epics

export default sitesReducer;
