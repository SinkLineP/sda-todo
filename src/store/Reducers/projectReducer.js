import { initialState } from "../States/projectInitialState";

const ActionTypes = {
  ADD_PROJECT: 'ADD_PROJECT',
};

function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT:
      return [...state, action.payload];

    default:
      return state;
  }
}

export const addProject = (projectData) => ({
  type: ActionTypes.ADD_PROJECT,
  payload: projectData,
});

export default ProjectReducer;