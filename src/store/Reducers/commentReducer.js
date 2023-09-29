import { initialState } from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT'
};

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      console.log(action.payload);

      return {
        ...state,
        comments: action.payload.commentStructure,
      };
    case ActionTypes.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    case ActionTypes.EDIT_COMMENT:
      const { commentId, updatedText } = action.payload;
      const updatedComments = state.comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: updatedText } : comment
      );

      return {
        ...state,
        comments: updatedComments,
      };
    default:
      return state;
  }
}

export const editComment = (commentId, updatedText) => ({
  type: ActionTypes.EDIT_COMMENT,
  payload: { commentId, updatedText },
});

export const addComment = (commentStructure) => ({ // Добавлены параметры user_id и task_id
  type: ActionTypes.ADD_COMMENT,
  payload: { commentStructure },
});

export const removeComment = (commentId) => ({
  type: ActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export default CommentReducer;