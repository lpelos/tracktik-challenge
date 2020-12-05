import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  Store,
} from "redux";
import { catchError } from "rxjs/operators";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { throwError } from "rxjs";

import { getSiteRepository } from "../initializers";
import sitesReducer, { sitesEpics } from "./sites";

//#region Redux setup

const rootReducer = combineReducers({
  sites: sitesReducer,
});

export type RootReducer = typeof rootReducer;

export type RootState = ReturnType<RootReducer>;

//#endregion Redux setup

//#region Redux Observable setup

const epicDependencies = {
  siteRepository: getSiteRepository(),
};

export type AppEpicDependencies = typeof epicDependencies;

export type AppEpic<
  Input extends Action = Action,
  Output extends Input = Input
> = Epic<Input, Output, RootState, AppEpicDependencies>;

const rootEpic: AppEpic = (action$, state$, dep) =>
  combineEpics<AppEpic>(sitesEpics)(action$, state$, dep).pipe(
    catchError((error: Error) => {
      const { message, name } = error;
      // Possible improvement: send error data to an analytics service
      console.log(`[Epic error] ${JSON.stringify({ name, message })}`);
      return throwError(error);
    })
  );

const epicMiddleware = createEpicMiddleware<
  Action,
  Action,
  RootState,
  AppEpicDependencies
>({ dependencies: epicDependencies });

//#endregion Redux Observable setup

const middlewares: Middleware[] = [epicMiddleware];

export default function configureStore(): Store<RootState> {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic);

  return store;
}
