import {initialState} from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  ADD_COMMENT_TO_TASK: 'ADD_COMMENT_TO_TASK'
};

function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return [...state, action.payload];

    case ActionTypes.ADD_COMMENT_TO_TASK:
      const { commentID, taskID } = action.payload;
      return state.map((task) => {
        if (task.id === taskID) {
          return {
            ...task,
            comments: [...task.comments, commentID]
          }
        }
        return task;
      });

    case ActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      return state.map((task) => task.id === taskId ? {...task, ...updatedTask} : task);

    case ActionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
}

export const editTask = (taskId, updatedTask) => ({
  type: ActionTypes.EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const addTask = (formData) => ({
  type: ActionTypes.ADD_TASK,
  payload: formData,
});

export const addCommentToTask = (commentID, taskID) => ({
  type: ActionTypes.ADD_COMMENT_TO_TASK,
  payload: { commentID, taskID },
});


export const removeTask = (taskId) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: taskId,
});

export default TaskReducer;