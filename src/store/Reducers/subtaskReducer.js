import {initialState} from "../States/subtaskInitialState";

const SubtaskActionTypes = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  EDIT_SUBTASK: 'EDIT_SUBTASK',
  EDIT_STATUS: 'EDIT_STATUS',
  EDIT_PRIORITY: 'EDIT_PRIORITY'
};

const statuses = {
  0: "queue",
  1: "development",
  2: "done",
}

const priorities = {
  0: "low",
  1: "medium",
  2: "height",
}

function SubtaskReducer(state = initialState, action) {
  switch (action.type) {
    case SubtaskActionTypes.ADD_SUBTASK:
      return [...state, action.payload];

    case SubtaskActionTypes.EDIT_SUBTASK:
      const { subtaskId, updatedSubtask } = action.payload;
      return state.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, ...updatedSubtask } : subtask
      );

    case SubtaskActionTypes.EDIT_STATUS:
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

    case SubtaskActionTypes.EDIT_PRIORITY:
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

export const editSubtask = (subtaskId, updatedSubtask) => ({
  type: SubtaskActionTypes.EDIT_SUBTASK,
  payload: { subtaskId, updatedSubtask },
});

export const editStatus = (id_status, status) => ({
  type: SubtaskActionTypes.EDIT_STATUS,
  payload: { id_status, status },
});

export const editPriority = (id_priority, priority) => ({
  type: SubtaskActionTypes.EDIT_PRIORITY,
  payload: { id_priority, priority },
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