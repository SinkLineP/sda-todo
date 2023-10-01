import { initialState } from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
};

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case ActionTypes.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== comment.payload),
      };
    case ActionTypes.EDIT_COMMENT:
      const { commentId, updatedComment } = action.payload;
      const updatedTasks = state.comments.map((comment) =>
        comment.id === commentId ? { ...comment, ...updatedComment } : comment
      );

      return {
        ...state,
        comments: updatedComment,
      };
    default:
      return state;
  }
}

export const editComment = (commentId, updatedComment) => ({
  type: ActionTypes.EDIT_COMMENT,
  payload: { commentId, updatedComment },
});

export const addComment = (formData) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: formData,
});

export const removeComment = (commentId) => ({
  type: ActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export default CommentReducer;