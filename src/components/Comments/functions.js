import {addReply} from "../../store/Reducers/commentReducer";
import {v4 as uuid} from "uuid";

const functionAddReply = (comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setStatusComment, setInputReplyValues) => {
  setErrorReply("")

  dispatch(addReply({
    id: uuid(),
    task_id: task_id,
    user_id: currentUser.id,
    date: new Date(),
    content: inputReplyValues[comment.id],
    parent_id: comment.id,
    comments: []
  }));

  setStatusComment("default");
  setInputReplyValues({
    ...inputReplyValues,
    [comment.id]: ""
  });
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

export const AddReply = (comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setStatusComment, setInputReplyValues) => {
  checkValueReply(() => {
    functionAddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setStatusComment, setInputReplyValues);
  }, comment, inputReplyValues, setErrorReply);
}
