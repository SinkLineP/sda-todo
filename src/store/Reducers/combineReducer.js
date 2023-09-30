import { persistReducer } from 'redux-persist';
import {combineReducers} from "redux";
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import persistConfig from "../persistConfig";

const rootReducer = combineReducers({
  tasks: taskReducer,
  categories: categoryReducer,
  auth: authReducer,
  project: projectReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;