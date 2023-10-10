import { initialState } from "../States/authInitialState";
import {AuthActionTypes} from "../Types/ActionTypes";

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload
      };

    case AuthActionTypes.CHANGE_FORM:
      return {
        ...state,
        currentForm: action.payload.currentForm
      }

    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
          password: action.payload.password
        }
      }

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: {
          id: null,
          username: "",
          password: ""
        }
      }

    default:
      return state;
  }
}

export default AuthReducer;

