import { initialState } from "../States/authInitialState";

const ActionTypes = {
  CREATE_USER: 'CREATE_USER',
  CHANGE_FORM: 'CHANGE_FORM',
  CHANGE_STATUS: 'CHANGE_STATUS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOGOUT: 'LOGOUT'
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_USER:
      return {
        ...state,
        users: [...state.users, {
          id: state.users.length === 0 ? 0 : state.users.length,
          username: action.payload.username,
          password: action.payload.password
        }],
        currentUser: {
          id: state.users.length === 0 ? 0 : state.users.length,
          username: action.payload.username,
          password: action.payload.password
        }
      };
    case ActionTypes.CHANGE_FORM:
      return {
        ...state,
        currentForm: action.payload.currentForm
      }
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
          password: action.payload.password
        }
      }
    case ActionTypes.LOGOUT:
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


export const createUser = (username, password) => ({
  type: ActionTypes.CREATE_USER,
  payload: { username, password },
});

export const changeForm = (currentForm) => ({
  type: ActionTypes.CHANGE_FORM,
  payload: { currentForm }
})

export const setCurrentUser = (id, username, password) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: { id, username, password }
})

export const logout = () => ({
  type: ActionTypes.LOGOUT
})


export default AuthReducer;

