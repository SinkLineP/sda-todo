import {initialState} from "../States/commentInitialState";

const ActionTypes = {
  ADD_COMMENT: 'ADD_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT',
  EDIT_COMMENT: 'EDIT_COMMENT',
  REPLY_COMMENT: 'REPLY_COMMENT',
  REMOVE_REPLY_COMMENT: 'REMOVE_REPLY_COMMENT'
};


const addChildToComment = (comment, parentId, newComment) => {
  if (comment.id === parentId) {
    if (!comment.comments) {
      comment.comments = [];
    }
    comment.comments.push(newComment);
  } else if (comment.comments) {
    for (const child of comment.comments) {
      addChildToComment(child, parentId, newComment);
    }
  }
  return comment;
};


const removeItemByIdRecursive = (array, idToRemove) => {
  const updatedArray = [];
  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];

    if (currentItem.id === idToRemove) {
      // If the item matches the id to remove, skip it
      continue;
    } else if (currentItem.comments && currentItem.comments.length > 0) {
      // Recursively update comments
      const updatedComments = removeItemByIdRecursive(currentItem.comments, idToRemove);
      currentItem.comments = updatedComments;
    }

    updatedArray.push(currentItem); // Add the current item to the updated array
  }
  return updatedArray;
};

const editCommentRecursive = (comments, commentId, newContent) => {
  console.log(comments);
  console.log(commentId);
  console.log(newContent);

  return comments.map(comment => {
    if (comment.id === commentId) {
      // Если это комментарий, который нужно отредактировать, верните новый объект с обновленным content
      return {
        ...comment,
        content: newContent
      };
    } else if (comment.comments.length > 0) {
      // Если у комментария есть дочерние комментарии, рекурсивно вызовите эту функцию для них
      return {
        ...comment,
        comments: editCommentRecursive(comment.comments, commentId, newContent)
      };
    } else {
      // Если комментарий не подходит по id, верните его без изменений
      return comment;
    }
  });
};


function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return [...state, action.payload];

    case ActionTypes.REPLY_COMMENT:
      const newComment = {
        id: action.payload.id,
        task_id: action.payload.task_id,
        user_id: action.payload.user_id,
        date: action.payload.date,
        content: action.payload.content,
        parent_id: action.payload.parent_id,
        comments: [],
      };

      return state.map((comment) => {
        return addChildToComment({...comment}, action.payload.parent_id, newComment)
      });

    case ActionTypes.REMOVE_REPLY_COMMENT:
      return removeItemByIdRecursive(state, action.payload);

    case ActionTypes.EDIT_COMMENT:
      return editCommentRecursive(state, action.payload.commentId, action.payload.newContent);

    case ActionTypes.REMOVE_COMMENT:
      return state.filter((comment) => {
        return comment.id !== action.payload;
      });

    default:
      return state;
  }
}

export const editComment = (commentId, newContent) => ({
    type: ActionTypes.EDIT_COMMENT,
    payload: {commentId, newContent }
});


export const addComment = (formData) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: formData,
});

export const addReply = (formData) => ({
  type: ActionTypes.REPLY_COMMENT,
  payload: formData,
});

export const removeComment = (commentId) => ({
  type: ActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export const removeReply = (commentId) => ({
  type: ActionTypes.REMOVE_REPLY_COMMENT,
  payload: commentId,
});


export default CommentReducer;