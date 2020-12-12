import { ActionsObservable, StateObservable } from "redux-observable";
import { of, throwError } from "rxjs";

import { AppEpicDependencies, RootAction, RootState } from "../store";
import HttpClientError from "../../errors/http-client.error";
import USER_DATA from "../../__fixtures__/user-data.fixture";
import userReducer, {
  getCurrentUserEpic,
  USER_ACTION_TYPES,
  userActions,
  UserState,
} from ".";
import UserRepository from "../../repositories/user";

describe("user reducer", () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = { data: undefined, error: undefined, isRequesting: false };
  });

  describe("sync actions", () => {
    test("return the initial state", () => {
      const action = { type: "non_existent_action" } as any;
      expect(userReducer(initialState, action)).toEqual(initialState);
    });

    test("handles get current request", () => {
      const action = userActions.getCurrentRequest();
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isRequesting: true,
      });
    });

    test("handles get current cancel", () => {
      const state = userReducer(initialState, userActions.getCurrentRequest());
      const action = userActions.getCurrentCancel();
      expect(userReducer(state, action).isRequesting).toBe(false);
    });

    test("handles get current failure", () => {
      const state = userReducer(initialState, userActions.getCurrentRequest());
      const error = new HttpClientError({ message: "bad stuff happened" });
      const action = userActions.getCurrentFailure(error);
      expect(userReducer(state, action)).toEqual({
        ...state,
        error: error.toJSON(),
        isRequesting: false,
      });
    });

    test("handles get current success", () => {
      const user = USER_DATA;
      const state = userReducer(initialState, userActions.getCurrentRequest());
      const action = userActions.getCurrentSuccess(user);
      expect(userReducer(state, action)).toEqual({
        ...initialState,
        data: user,
      });
    });
  });

  describe("async actions", () => {
    const user = USER_DATA;

    let action$: ActionsObservable<RootAction>;
    let dependencies: AppEpicDependencies;
    let state$: StateObservable<RootState>;
    let userRepositoryMock: UserRepository;

    beforeEach(() => {
      userRepositoryMock = { getCurrent: jest.fn(() => of(user)) } as any;

      dependencies = { userRepository: userRepositoryMock } as any;
      state$ = { value: { user: initialState } } as any;
    });

    describe("get current user", () => {
      beforeEach(() => {
        action$ = of({ type: USER_ACTION_TYPES.GET_CURRENT_REQUEST }) as any;
      });

      test("handle request", (done) => {
        getCurrentUserEpic(action$, state$, dependencies).subscribe(() => {
          expect(userRepositoryMock.getCurrent).toHaveBeenCalled();
          done();
        });
      });

      test("dispatch success", (done) => {
        getCurrentUserEpic(action$, state$, dependencies).subscribe(
          (action) => {
            expect(action).toEqual({
              type: USER_ACTION_TYPES.GET_CURRENT_SUCCESS,
              payload: { user },
            });
            done();
          }
        );
      });

      test("dispatch error", (done) => {
        const error = new HttpClientError({ message: "bad stuff happened" });
        userRepositoryMock.getCurrent = jest.fn(() => throwError(error));
        getCurrentUserEpic(action$, state$, dependencies).subscribe(
          (action) => {
            expect(action).toEqual({
              type: USER_ACTION_TYPES.GET_CURRENT_FAILURE,
              payload: { error: error.toJSON() },
            });
            done();
          }
        );
      });
    });
  });
});
