import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return {store, persistor};
};
