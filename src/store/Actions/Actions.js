import {TASKActionTypes} from "../Types/ActionTypes";

export const editTask = (taskId, updatedTask) => ({
  type: TASKActionTypes.EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const addTask = (formData) => ({
  type: TASKActionTypes.ADD_TASK,
  payload: formData,
});

export const addCommentToTask = (commentID, taskID) => ({
  type: TASKActionTypes.ADD_COMMENT_TO_TASK,
  payload: { commentID, taskID },
});

export const addSubtaskToTask = (subtask_ID, ID_task) => ({
  type: TASKActionTypes.ADD_SUBTASK_TO_TASK,
  payload: { subtask_ID, ID_task },
});

export const removeTask = (taskId) => ({
  type: TASKActionTypes.REMOVE_TASK,
  payload: taskId,
});

export const removeSubtaskFromTask = (subtaskID, task_ID) => ({
  type: TASKActionTypes.REMOVE_SUBTASK_FROM_TASK,
  payload: { subtaskID, task_ID },
});

export const removeCommentFromTask = (commentId, task_id) => ({
  type: TASKActionTypes.REMOVE_COMMENT_FROM_TASK,
  payload: { commentId, task_id },
});

export const startTask = (status_start, startDate, Id_task_start, icon_start) => ({
  type: TASKActionTypes.START_TASK,
  payload: { status_start, startDate, Id_task_start, icon_start }
})

export const endTask = (status_end, endDate, Id_task_end, icon_end) => ({
  type: TASKActionTypes.END_TASK,
  payload: { status_end, endDate, Id_task_end, icon_end }
})

export const editPriorityTask = (id_priority, priority) => ({
  type: TASKActionTypes.EDIT_PRIORITY_TASK,
  payload: { id_priority, priority },
});

export const editStartDate = (id_start, start_date, start_status, start_icon) => ({
  type: TASKActionTypes.EDIT_START_DATE,
  payload: { id_start, start_date, start_status, start_icon }
});
export const editEndDate = (id_end, end_date, end_status, end_icon) => ({
  type: TASKActionTypes.EDIT_END_DATE,
  payload: { id_end, end_date, end_status, end_icon }
});
