import { AnyAction, applyMiddleware, compose, createStore, Dispatch } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch & ThunkDispatch<RootState, unknown, AnyAction>;
export default store;
