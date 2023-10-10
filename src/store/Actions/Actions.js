import {
  AuthActionTypes,
  CategoryActionTypes,
  CommentActionTypes,
  ProjectActionTypes,
  SubtaskActionTypes,
  TASKActionTypes
} from "../Types/ActionTypes";

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

export const editStatusSubtask = (id_status, status) => ({
  type: SubtaskActionTypes.EDIT_STATUS_SUBTASK,
  payload: { id_status, status },
});

export const editPrioritySubtask = (id_priority, priority) => ({
  type: SubtaskActionTypes.EDIT_PRIORITY_SUBTASK,
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

export const addProject = (projectData) => ({
  type: ProjectActionTypes.ADD_PROJECT,
  payload: projectData,
});

export const editComment = (commentId, newContent) => ({
  type: CommentActionTypes.EDIT_COMMENT,
  payload: {commentId, newContent }
});


export const addComment = (formData) => ({
  type: CommentActionTypes.ADD_COMMENT,
  payload: formData,
});

export const addReply = (formData) => ({
  type: CommentActionTypes.REPLY_COMMENT,
  payload: formData,
});

export const removeComment = (commentId) => ({
  type: CommentActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export const removeReply = (commentId) => ({
  type: CommentActionTypes.REMOVE_REPLY_COMMENT,
  payload: commentId,
});

export const editCategory = (categoryId, updatedCategory) => ({
  type: CategoryActionTypes.EDIT_CATEGORY,
  payload: { categoryId, updatedCategory },
});

export const addCategory = (category) => ({
  type: CategoryActionTypes.ADD_CATEGORY,
  payload: category,
});

export const removeCategory = (categoryId) => ({
  type: CategoryActionTypes.REMOVE_CATEGORY,
  payload: categoryId,
});

export const createUser = (userData) => ({
  type: AuthActionTypes.CREATE_USER,
  payload: userData,
});

export const changeForm = (currentForm) => ({
  type: AuthActionTypes.CHANGE_FORM,
  payload: { currentForm }
})

export const setCurrentUser = (id, username, password) => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: { id, username, password }
})

export const logout = () => ({
  type: AuthActionTypes.LOGOUT
})