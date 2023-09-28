import { combineReducers } from 'redux';
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
  tasks: taskReducer,
  categories: categoryReducer,
  auth: authReducer,
  project: projectReducer
});

