import {initialState} from "../States/subtaskInitialState";

const SubtaskActionTypes = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  EDIT_SUBTASK: 'EDIT_SUBTASK',
  EDIT_STATUS: 'EDIT_STATUS'
};

const statuses = {
  0: "queue",
  1: "development",
  2: "done",
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
      const { id, status } = action.payload;
      // console.log(`ID: ${id}, Status: ${status}`);
      console.log(status);
      // Используем map для создания нового массива с обновленными значениями
      return state.map((subtask) => {
        if (subtask.id === id) {
          return {
            ...subtask,
            statusSubtask: statuses[status],
          };
        }
        return subtask; // Возвращаем неизмененный объект для остальных подзадач
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

export const editStatus = (id, status) => ({
  type: SubtaskActionTypes.EDIT_STATUS,
  payload: { id, status },
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