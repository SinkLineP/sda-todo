import { legacy_createStore as createStore } from 'redux';
import persistedReducer from "./Reducers/combineReducer";
import {persistStore} from "redux-persist";

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store, null, () => {
  console.log('Состояние восстановлено');
});
