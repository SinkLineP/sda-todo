import { persistReducer } from 'redux-persist';
import {combineReducers} from "redux";
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import persistConfig from "../persistConfig";
import commentReducer from "./commentReducer";
import subtaskReducer from "./subtaskReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  categories: categoryReducer,
  auth: authReducer,
  projects: projectReducer,
  comments: commentReducer,
  subtasks: subtaskReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;