import {initialState} from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
};

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return [...state, action.payload];

    case ActionTypes.EDIT_COMMENT:
      const { commentID, updatedComment } = action.payload;
      return state.map((comment) => comment.id === commentID ? {...comment, ...updatedComment} : comment);

    case ActionTypes.REMOVE_COMMENT:
      return state.filter((comment) => {
        return comment.id !== action.payload;
      });

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