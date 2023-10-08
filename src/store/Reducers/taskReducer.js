import {initialState} from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  ADD_COMMENT_TO_TASK: 'ADD_COMMENT_TO_TASK',
  REMOVE_SUBTASK_FROM_TASK: 'REMOVE_SUBTASK_FROM_TASK',
  REMOVE_COMMENT_FROM_TASK: 'REMOVE_COMMENT_FROM_TASK',
  ADD_SUBTASK_TO_TASK: 'ADD_SUBTASK_TO_TASK',
  START_TASK: 'START_TASK',
  END_TASK: 'END_TASK',
  EDIT_STATUS_TASK: 'EDIT_STATUS_TASK',
  EDIT_PRIORITY_TASK: 'EDIT_PRIORITY_TASK',
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
      const { status_start, startDate, Id_task_start, icon_start } = action.payload;

      return state.map((task) => {
        if (task.id === Id_task_start) {
          return {
            ...task,
            status: status_start,
            startDate: startDate,
            icon: icon_start
          };
        }
        return task;
      });

    case ActionTypes.END_TASK:
      const { status_end, endDate, Id_task_end, icon_end } = action.payload;

      return state.map((task) => {
        if (task.id === Id_task_end) {
          return {
            ...task,
            status: status_end,
            endDate: endDate,
            icon: icon_end
          };
        }
        return task;
      });

    case ActionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case ActionTypes.EDIT_STATUS_TASK:
      const { id_status, status } = action.payload;
      return state.map((task) => {
        if (task.id === id_status) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });

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

export const startTask = (status_start, startDate, Id_task_start, icon_start) => ({
  type: ActionTypes.START_TASK,
  payload: { status_start, startDate, Id_task_start, icon_start }
})

export const endTask = (status_end, endDate, Id_task_end, icon_end) => ({
  type: ActionTypes.END_TASK,
  payload: { status_end, endDate, Id_task_end, icon_end }
})

export const editStatusTask = (id_status, status) => ({
  type: ActionTypes.EDIT_STATUS_TASK,
  payload: { id_status, status }
})


export default TaskReducer;