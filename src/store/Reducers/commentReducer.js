import {initialState} from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
};

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const existingCommentIndex = state.findIndex(comment => comment.id === action.payload.id);

      if (existingCommentIndex !== -1) {
        // Comment with the same ID exists, replace the entire state
        return [...state.slice(0, existingCommentIndex), action.payload, ...state.slice(existingCommentIndex + 1)];
      } else {
        // Comment with the given ID doesn't exist, add the new comment to the state
        return [...state, action.payload];
      }

    case ActionTypes.EDIT_COMMENT:
      const { commentID, updatedComment } = action.payload;


      return state.map((comment) => {
        return comment.id === commentID ? {
          ...comment,
          content: updatedComment
        } : comment;
      });

    case ActionTypes.REMOVE_COMMENT:
      return state.filter((comment) => {
        return comment.id !== action.payload;
      });

    default:
      return state;
  }
}

export const editComment = (editData) => ({
  type: ActionTypes.EDIT_COMMENT,
  payload: editData,
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