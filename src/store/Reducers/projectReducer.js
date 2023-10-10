import { initialState } from "../States/projectInitialState";
import {ProjectActionTypes} from "../Types/ActionTypes";



function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return [...state, action.payload];

    default:
      return state;
  }
}



export default ProjectReducer;