import { combineReducers } from 'redux';
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  tasks: taskReducer,
  categories: categoryReducer
});

