import { legacy_createStore as createStore } from 'redux';
import rootReducer from "./Reducers/combineReducer";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(() => {
//   console.log('subscribe', store.getState());
// })

export default store;