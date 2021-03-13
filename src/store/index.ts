import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { accountReducer } from "./account/reducers";
import thunkMiddleware from 'redux-thunk'
import storage from "redux-persist/lib/storage";
import { persistReducer , persistStore } from "redux-persist";
import { setAuthToken } from "../helpers/set-auth-token";

const persistConfig = {
  key: 'root',
  storage,
  whitelist : ['account']
}

const rootReducer = combineReducers({
    account : accountReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
    const middleware = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);

    return createStore(persistedReducer, composeEnhancers(middlewareEnhancer))
}

const store = configureStore();
const persistedStore = persistStore(store)

let currentState = store.getState() as AppState;

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState() as AppState;
  // if the token changes set the value in localStorage and axios headers
  if (previousState.account.token !== currentState.account.token) {
    const token = currentState.account.token;
    if (token) {
      setAuthToken(token);
    }
  }
});

export{
  store, persistedStore 
}