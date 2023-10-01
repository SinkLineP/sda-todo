import {initialState} from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
};

function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return [
        ...state,
        action.payload
      ];
    case ActionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case ActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      return state.map((task) =>
        task.id === taskId ? {...task, ...updatedTask} : task
      );
    default:
      return state;
  }
}

export const editTask = (taskId, updatedTask) => ({
  type: ActionTypes.EDIT_TASK,
  payload: { taskId, updatedTask }, // Обернуть в объект
});

export const addTask = (formData) => ({
  type: ActionTypes.ADD_TASK,
  payload: formData,
});

export const removeTask = (taskId) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: taskId,
});

export default TaskReducer;