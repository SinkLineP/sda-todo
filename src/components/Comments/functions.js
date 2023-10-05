import {addReply, editComment} from "../../store/Reducers/commentReducer";
import {v4 as uuid} from "uuid";
import {addCommentToTask} from "../../store/Reducers/taskReducer";

const functionAddReply = (comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setInputReplyValues, setShowInputFromID) => {
  setErrorReply("")
  const commentID = uuid();

  dispatch(addCommentToTask(commentID, task_id));

  dispatch(addReply({
    id: commentID,
    task_id: task_id,
    user_id: currentUser.id,
    date: new Date(),
    content: inputReplyValues[comment.id],
    parent_id: comment.id,
    comments: []
  }));

  setInputReplyValues({
    ...inputReplyValues,
    [comment.id]: ""
  });

  setActiveReplyComments(comment.id, false, setShowInputFromID, "default");
}

const checkValueReply = (func, comment, inputReplyValues, setErrorReply) => {
  if (inputReplyValues[comment.id] !== undefined) {
    if (inputReplyValues[comment.id].length > 0) {
      return func()
    } else {
      setErrorReply("Введите ответ...")
    }
  } else {
    setErrorReply("Введите ответ...")
  }
}

export const AddReply = (comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setInputReplyValues, setShowInputFromID) => {
  checkValueReply(() => {
    functionAddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setInputReplyValues, setShowInputFromID);
  }, comment, inputReplyValues, setErrorReply);
}

export const EditReply = (comment, dispatch, inputEditValues, setEditError, setStatus, setIsEditing, setInputEditValues) => {
  if (inputEditValues[comment.id] !== undefined) {
    if (inputEditValues[comment.id].length > 0) {
      setEditError("");
      setStatus("default");
      setIsEditing(false);

      setInputEditValues({
        ...inputEditValues,
        [comment.id]: inputEditValues[comment.id]
      });

      dispatch(editComment(comment.id, inputEditValues[comment.id]));
    } else {
      setEditError("Поле не должно быть пустым!");
    }
  }
}

export const CheckActiveReplyComments = (data, commentID) => {
  const matchingObj = data.find((obj) => {
    const key = Object.keys(obj).toString();
    return key.split(",")[0] === commentID;
  });

  return !!(matchingObj && matchingObj[commentID]);
}

export const CheckStatusReplyComments = (data, commentID) => {
  const matchingObj = data.find((obj) => {
    const key = Object.keys(obj).toString();
    return key.split(",")[0] === commentID;
  });

  return matchingObj ? matchingObj.status : 'default';
}

export const setActiveReplyComments = (commentId, isVisible, setShowInputFromID, status) => {
  setShowInputFromID((prevState) => {
    // Создайте копию предыдущего состояния (клон объекта)
    const updatedState = [...prevState];

    // Найдите объект в массиве, соответствующий commentId
    const index = updatedState.findIndex((obj) => {
      const key = Object.keys(obj).toString();
      return key.split(",")[0] === commentId;
    });

    if (index !== -1) {
      // Если объект с commentId найден, инвертируйте его значение
      const existingObj = updatedState[index];
      const existingKey = Object.keys(existingObj)[0];
      const existingValue = existingObj[existingKey];
      updatedState[index] = {
        [existingKey]: !existingValue,
        status: status
      };
    } else {
      // Если объект с commentId не найден, добавьте новый объект
      updatedState.push({
        [commentId]: isVisible,
        status: status
      });
    }

    // Верните обновленное состояние
    return updatedState.filter(value => Object.keys(value).length !== 0);
  })
}
