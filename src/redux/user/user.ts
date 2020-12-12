import { action, ActionType, isOfType } from "typesafe-actions";
import { catchError, filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { of } from "rxjs";

import { AppEpic, RootAction, RootState } from "../store";
import { errorToJSON } from "../../helpers/error.helper";
import ErrorData from "../../data-types/error-data";
import UserData from "../../data-types/user-data";

//#region Actions

//#region Get Current Actions
const GET_CURRENT_CANCEL = "user/get_current_cancel";
const getCurrentCancelAction = () => action(GET_CURRENT_CANCEL);

const GET_CURRENT_FAILURE = "user/get_current_failure";
const getCurrentFailureAction = (error: Error) =>
  action(GET_CURRENT_FAILURE, { error: errorToJSON(error) });

const GET_CURRENT_REQUEST = "user/get_current_request";
const getCurrentRequestAction = () => action(GET_CURRENT_REQUEST);

const GET_CURRENT_SUCCESS = "user/find_success";
const getCurrentSuccessAction = (user?: UserData) =>
  action(GET_CURRENT_SUCCESS, { user });
//#region Get Current Actions

export const USER_ACTION_TYPES = {
  GET_CURRENT_CANCEL,
  GET_CURRENT_FAILURE,
  GET_CURRENT_REQUEST,
  GET_CURRENT_SUCCESS,
};

export const userActions = {
  getCurrentCancel: getCurrentCancelAction,
  getCurrentFailure: getCurrentFailureAction,
  getCurrentRequest: getCurrentRequestAction,
  getCurrentSuccess: getCurrentSuccessAction,
};

export type UserAction = ActionType<typeof userActions>;

//#endregion Actions

//#region Selectors

const selectUserState = (rootState: RootState) => rootState.user;

export const selectUserData = (rootState: RootState) => {
  const state = selectUserState(rootState);
  return state.data;
};

export const selectUserError = (rootState: RootState) => {
  const state = selectUserState(rootState);
  return state.error;
};

export const selectUserIsRequesting = (rootState: RootState) => {
  const state = selectUserState(rootState);
  return state.isRequesting;
};

//#endregion Selectors

//#region Reducers

export interface UserState {
  data?: UserData;
  error?: ErrorData;
  isRequesting: boolean;
}

const initialState: UserState = {
  isRequesting: false,
};

export const userReducer = (
  state: UserState = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case GET_CURRENT_CANCEL: {
      return { ...state, isRequesting: false };
    }
    case GET_CURRENT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, isRequesting: false };
    }
    case GET_CURRENT_REQUEST: {
      return {
        ...state,
        data: undefined,
        error: undefined,
        isRequesting: true,
      };
    }
    case GET_CURRENT_SUCCESS: {
      const { user: data } = action.payload;
      return { ...state, data, isRequesting: false };
    }
    default: {
      return state;
    }
  }
};

//#endregion Reducers

//#region Epics

export const getCurrentUserEpic: AppEpic = (action$, _, { userRepository }) =>
  action$.pipe(
    filter(isOfType(GET_CURRENT_REQUEST)),
    mergeMap(() =>
      userRepository.getCurrent().pipe(
        takeUntil(action$.pipe(filter(isOfType(GET_CURRENT_CANCEL)))),
        map((user) => getCurrentSuccessAction(user)),
        catchError((error) => of(getCurrentFailureAction(error)))
      )
    )
  );

export const userEpics = combineEpics(getCurrentUserEpic);

//#endregion Epics

export default userReducer;
