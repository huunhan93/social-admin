import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { accountReducer } from "./account/reducers";
import thunkMiddleware from 'redux-thunk'
import storage from "redux-persist/lib/storage";
import { persistReducer , persistStore } from "redux-persist";

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

export{
  store, persistedStore 
}