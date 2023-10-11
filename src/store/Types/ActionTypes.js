export const TASKActionTypes = {
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
  EDIT_START_DATE: 'EDIT_START_DATE',
  EDIT_END_DATE: 'EDIT_END_DATE',
};

export const SubtaskActionTypes = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  EDIT_SUBTASK: 'EDIT_SUBTASK',
  EDIT_STATUS_SUBTASK: 'EDIT_STATUS_SUBTASK',
  EDIT_PRIORITY_SUBTASK: 'EDIT_PRIORITY_SUBTASK'
};

export const ProjectActionTypes = {
  ADD_PROJECT: 'ADD_PROJECT',
};

export const CommentActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
  REPLY_COMMENT: 'REPLY_COMMENT',
  REMOVE_REPLY_COMMENT: 'REMOVE_REPLY_COMMENT'
};

export const CategoryActionTypes = {
  ADD_CATEGORY: 'ADD_CATEGORY',
  REMOVE_CATEGORY: 'REMOVE_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY'
};

export const AuthActionTypes = {
  CREATE_USER: 'CREATE_USER',
  CHANGE_FORM: 'CHANGE_FORM',
  CHANGE_STATUS: 'CHANGE_STATUS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  LOGOUT: 'LOGOUT'
};