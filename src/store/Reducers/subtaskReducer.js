import {initialState} from "../States/subtaskInitialState";
import {priorities, statuses} from "../../Functions";
import {SubtaskActionTypes} from "../Types/ActionTypes";


function SubtaskReducer(state = initialState, action) {
  switch (action.type) {
    case SubtaskActionTypes.ADD_SUBTASK:
      return [...state, action.payload];

    case SubtaskActionTypes.EDIT_STATUS_SUBTASK:
      const { id_status, status } = action.payload;
      return state.map((subtask) => {
        if (subtask.id === id_status) {
          return {
            ...subtask,
            statusSubtask: statuses[status],
          };
        }
        return subtask;
      });

    case SubtaskActionTypes.EDIT_PRIORITY_SUBTASK:
      const { id_priority, priority } = action.payload;
      return state.map((subtask) => {
        if (subtask.id === id_priority) {
          return {
            ...subtask,
            prioritySubtask: priorities[priority],
          };
        }
        return subtask;
      });

    case SubtaskActionTypes.REMOVE_SUBTASK:
      return state.filter((subtask) => subtask.id !== action.payload);

    default:
      return state;
  }
}


export default SubtaskReducer;