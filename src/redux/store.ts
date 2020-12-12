import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  Store,
} from "redux";
import { catchError } from "rxjs/operators";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { throwError } from "rxjs";
import logger from "redux-logger";

import { ENVIRONMENT } from "../env";
import { getSiteRepository, getUserRepository } from "../initializers";
import siteReducer, { SiteAction, siteEpics } from "./site";
import sitesReducer, { SitesAction, sitesEpics } from "./sites";
import userReducer, { UserAction, userEpics } from "./user";

//#region Redux setup

export type RootAction = SiteAction | SitesAction | UserAction;

const rootReducer = combineReducers({
  site: siteReducer,
  sites: sitesReducer,
  user: userReducer,
});

export type RootReducer = typeof rootReducer;

export type RootState = ReturnType<RootReducer>;

//#endregion Redux setup

//#region Redux Observable setup

const epicDependencies = {
  siteRepository: getSiteRepository(),
  userRepository: getUserRepository(),
};

export type AppEpicDependencies = typeof epicDependencies;

export type AppEpic = Epic<
  RootAction,
  RootAction,
  RootState,
  AppEpicDependencies
>;

const rootEpic: AppEpic = (action$, state$, dep) =>
  combineEpics<AppEpic>(siteEpics, sitesEpics, userEpics)(
    action$,
    state$,
    dep
  ).pipe(
    catchError((error: Error) => {
      const { message, name } = error;
      // Possible improvement: send error data to an analytics service
      console.log(`[Epic error] ${JSON.stringify({ name, message })}`);
      return throwError(error);
    })
  );

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  AppEpicDependencies
>({ dependencies: epicDependencies });

//#endregion Redux Observable setup

let middlewares: Middleware[] = [epicMiddleware];
if (ENVIRONMENT === "development") {
  middlewares = [...middlewares, logger];
}

export default function configureStore(): Store<RootState> {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic);

  return store;
}
