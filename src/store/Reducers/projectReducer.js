import { initialState } from "../States/projectInitialState";

const ActionTypes = {
  ADD_PROJECT: 'ADD_PROJECT',
};

function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT:
      return {
        ...state,
        tasks: [...state.projects, action.payload],
      };
    default:
      return state;
  }
}

export const addProject = (project) => ({
  type: ActionTypes.ADD_TASK,
  payload: project,
});




export default ProjectReducer;