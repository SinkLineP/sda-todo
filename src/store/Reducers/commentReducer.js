import {initialState} from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
  REPLY_COMMENT: 'REPLY_COMMENT',
};


const addChildToComment = (comment, parentId, newComment) => {
  // Если текущий комментарий имеет идентификатор родительского комментария,
  // мы должны добавить новый комментарий в его список подкомментариев
  if (comment.id === parentId) {
    if (!comment.comments) {
      comment.comments = [];
    }
    comment.comments.push(newComment);
  } else if (comment.comments) {
    // Если у текущего комментария есть подкомментарии,
    // рекурсивно вызываем эту функцию для каждого из них
    for (const child of comment.comments) {
      addChildToComment(child, parentId, newComment);
    }
  }
  return comment; // Возвращаем обновленный объект комментария
};

function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return [...state, action.payload];

    case ActionTypes.REPLY_COMMENT:
      // Создаем новый комментарий на основе action.payload
      const newComment = {
        id: action.payload.id,
        task_id: action.payload.task_id,
        user_id: action.payload.user_id,
        date: action.payload.date,
        content: action.payload.content,
        parent_id: action.payload.parent_id,
        comments: [], // Начально у нового комментария нет подкомментариев
      };

      // Обновляем состояние с новым комментарием, используя функцию addChildToComment
      return state.map((comment) =>
        addChildToComment({...comment}, action.payload.parent_id, newComment)
      );

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

export const replyComment = (formData) => ({
  type: ActionTypes.REPLY_COMMENT,
  payload: formData,
});

export const removeComment = (commentId) => ({
  type: ActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export default CommentReducer;