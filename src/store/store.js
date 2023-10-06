import {applyMiddleware, compose, createStore} from 'redux';
import persistedReducer from "./Reducers/combineReducer";
import {persistStore} from "redux-persist";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

export const persistor = persistStore(store, null, () => {
  console.log('Состояние восстановлено');
});
