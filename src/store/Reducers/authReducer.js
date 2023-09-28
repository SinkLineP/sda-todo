import { initialState } from "../States/authInitialState";

const ActionTypes = {
  CREATE_USER: 'CREATE_USER',
  CHANGE_FORM: 'CHANGE_FORM',
  CHANGE_STATUS: 'CHANGE_STATUS'
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



export default AuthReducer;

