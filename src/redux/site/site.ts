import { action, ActionType, isOfType } from "typesafe-actions";
import { catchError, filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { of } from "rxjs";

import { AppEpic, RootAction, RootState } from "../store";
import { errorToJSON } from "../../helpers/error.helper";
import ErrorData from "../../data-types/error-data";
import SiteData from "../../data-types/site-data";

//#region Actions

//#region Find Actions
const FIND_CANCEL = "site/find_cancel";
const findCancelAction = () => action(FIND_CANCEL);

const FIND_FAILURE = "site/find_failure";
const findFailureAction = (error: Error) =>
  action(FIND_FAILURE, { error: errorToJSON(error) });

const FIND_REQUEST = "site/find_request";
const findRequestAction = (id: SiteData["id"]) => action(FIND_REQUEST, { id });

const FIND_SUCCESS = "site/find_success";
const findSuccessAction = (site: SiteData) => action(FIND_SUCCESS, { site });
//#endregion Find Actions

export const SITE_ACTION_TYPES = {
  FIND_CANCEL,
  FIND_FAILURE,
  FIND_REQUEST,
  FIND_SUCCESS,
};

export const siteActions = {
  findCancel: findCancelAction,
  findFailure: findFailureAction,
  findRequest: findRequestAction,
  findSuccess: findSuccessAction,
};

export type SiteAction = ActionType<typeof siteActions>;

//#endregion Actions

//#region Selectors

const selectSiteState = (rootState: RootState) => rootState.site;

export const selectSiteData = (rootState: RootState) => {
  const state = selectSiteState(rootState);
  return state.data;
};

export const selectSiteError = (rootState: RootState) => {
  const state = selectSiteState(rootState);
  return state.error;
};

export const selectSiteIsRequesting = (rootState: RootState) => {
  const state = selectSiteState(rootState);
  return state.isRequesting;
};

//#endregion Selectors

//#region Reducers

export interface SiteState {
  data?: SiteData;
  error?: ErrorData;
  isRequesting: boolean;
}

const initialState: SiteState = {
  isRequesting: false,
};

export const siteReducer = (
  state: SiteState = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case FIND_CANCEL: {
      return { ...state, isRequesting: false };
    }
    case FIND_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, isRequesting: false };
    }
    case FIND_REQUEST: {
      return {
        ...state,
        data: undefined,
        error: undefined,
        isRequesting: true,
      };
    }
    case FIND_SUCCESS: {
      const { site: data } = action.payload;
      return { ...state, data, isRequesting: false };
    }
    default: {
      return state;
    }
  }
};

//#endregion Reducers

//#region Epics

export const findSiteEpic: AppEpic = (action$, _, { siteRepository }) =>
  action$.pipe(
    filter(isOfType(FIND_REQUEST)),
    mergeMap(({ payload }) =>
      siteRepository.find(payload.id).pipe(
        takeUntil(action$.pipe(filter(isOfType(FIND_CANCEL)))),
        map((site) => findSuccessAction(site)),
        catchError((error) => of(findFailureAction(error)))
      )
    )
  );

export const siteEpics = combineEpics(findSiteEpic);

//#endregion Epics

export default siteReducer;
