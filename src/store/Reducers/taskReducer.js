import {initialState} from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  ADD_COMMENT_TO_TASK: 'ADD_COMMENT_TO_TASK',
  REMOVE_SUBTASK_FROM_TASK: 'REMOVE_SUBTASK_FROM_TASK',
  REMOVE_COMMENT_FROM_TASK: 'REMOVE_COMMENT_FROM_TASK',
  ADD_SUBTASK_TO_TASK: 'ADD_SUBTASK_TO_TASK',
  START_TASK: 'START_TASK'
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

    case ActionTypes.ADD_SUBTASK_TO_TASK:
      const { subtask_ID, ID_task } = action.payload;
      return state.map((task) => {
        if (task.id === ID_task) {
          return {
            ...task,
            subtasks: [...task.subtasks, subtask_ID]
          }
        }
        return task;
      });

    case ActionTypes.REMOVE_SUBTASK_FROM_TASK:
      const { subtaskID, task_ID } = action.payload;

      return state.map((task) => {
        if (task.id === task_ID) {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => subtask !== subtaskID)
          };
        }
        return task;
      });

    case ActionTypes.REMOVE_COMMENT_FROM_TASK:
      const { commentId, task_id } = action.payload;

      return state.map((task) => {
        if (task.id === task_id) {
          return {
            ...task,
            comments: task.comments.filter((subtask) => subtask !== commentId)
          };
        }
        return task;
      });

    case ActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      return state.map((task) => {
        return task.id === taskId ? {...task, ...updatedTask} : task
      });

    case ActionTypes.START_TASK:
      const { status, startDate, Id_task, icon } = action.payload;

      return state.map((task) => {
        if (task.id === Id_task) {
          return {
            ...task,
            status: status,
            startDate: startDate,
            icon: icon
          };
        }
        return task;
      });

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

export const addSubtaskToTask = (subtask_ID, ID_task) => ({
  type: ActionTypes.ADD_SUBTASK_TO_TASK,
  payload: { subtask_ID, ID_task },
});

export const removeTask = (taskId) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: taskId,
});

export const removeSubtaskFromTask = (subtaskID, task_ID) => ({
  type: ActionTypes.REMOVE_SUBTASK_FROM_TASK,
  payload: { subtaskID, task_ID },
});

export const removeCommentFromTask = (commentId, task_id) => ({
  type: ActionTypes.REMOVE_COMMENT_FROM_TASK,
  payload: { commentId, task_id },
});

export const startTask = (status, startDate, Id_task, icon) => ({
  type: ActionTypes.START_TASK,
  payload: { status, startDate, Id_task, icon }
})


export default TaskReducer;