import { combineReducers } from 'redux';
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";

export default combineReducers({
  tasks: taskReducer,
  categories: categoryReducer,
  auth: authReducer
});

