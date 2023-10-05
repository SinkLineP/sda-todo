import { initialState } from "../States/subtaskInitialState";

const SubtaskActionTypes = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  EDIT_SUBTASK: 'EDIT_SUBTASK',
};

function SubtaskReducer(state = initialState, action) {
  switch (action.type) {
    case SubtaskActionTypes.ADD_SUBTASK:
      return [...state, action.payload];

    case SubtaskActionTypes.EDIT_SUBTASK:
      const { subtaskId, updatedSubtask } = action.payload;
      return state.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, ...updatedSubtask } : subtask
      );

    case SubtaskActionTypes.REMOVE_SUBTASK:
      return state.filter((subtask) => subtask.id !== action.payload);

    default:
      return state;
  }
}

export const editSubtask = (subtaskId, updatedSubtask) => ({
  type: SubtaskActionTypes.EDIT_SUBTASK,
  payload: { subtaskId, updatedSubtask },
});

export const addSubtask = (formData) => ({
  type: SubtaskActionTypes.ADD_SUBTASK,
  payload: formData,
});

export const removeSubtask = (subtaskId) => ({
  type: SubtaskActionTypes.REMOVE_SUBTASK,
  payload: subtaskId,
});

export default SubtaskReducer;