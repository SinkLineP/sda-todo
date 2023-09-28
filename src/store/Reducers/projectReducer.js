import { initialState } from "../States/projectInitialState";

const ActionTypes = {
  ADD_PROJECT: 'ADD_PROJECT',
};

function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT:
      return {
        ...state,
        tasks: [...state.projects, {
          id: state.projects.length === 0 ? 0 : state.projects.length,
          title: action.payload.projectName,
          status: action.payload.status,
          user_id: action.payload.user_id
        }],
      };
    default:
      return state;
  }
}

export const addProject = (projectName, status, user_id) => ({
  type: ActionTypes.ADD_TASK,
  payload: {projectName, status, user_id},
});




export default ProjectReducer;