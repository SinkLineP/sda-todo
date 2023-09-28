import { initialState } from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  EDIT_TASK: 'EDIT_TASK'
};

function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ActionTypes.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, status: 'done' } : task
        ),
      };
    case ActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
}

export const editTask = (taskId, updatedTask) => ({
  type: ActionTypes.EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const addTask = (task) => ({
  type: ActionTypes.ADD_TASK,
  payload: task,
});

export const removeTask = (taskId) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: taskId,
});

export const completeTask = (taskId) => ({
  type: ActionTypes.COMPLETE_TASK,
  payload: taskId,
});

export default (TaskReducer, addTask, removeTask, editTask, completeTask);