import React, {useEffect, useState} from "react";
import ButtonCustom from "./ButtonCustom";
import {editComment, removeComment, removeReply} from "../../../store/Reducers/commentReducer";
import {useDispatch, useSelector} from "react-redux";

const ShowButtons = ({
  commentID ,
  comment,
  task_id,
  setIsEditing,
  isEditing,
  commentIDClicked,
  inputEditValues,
  setInputEditValues,
  setStatusComment,
  statusComment,
  setEditError,
  errorEdit
}) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("default");

  useEffect(() => {
    if (statusComment === "default") setStatus("default");
  }, [statusComment, setStatus]);

  const handleRemoveReply = (commentId) => {
    dispatch(removeReply(commentId)); // Вызываете экшен removeReply
  };

    if (status === "default") {
      return (
        <>
          <ButtonCustom className={"button-on-comment button-reply"} handleCLick={() => {
            setStatus("reply")
            setStatusComment("reply")
          }} title={"Ответить"} />
          {comment.user_id === currentUser.id && (
            <>
              <ButtonCustom className={"button-on-comment button-edit"} handleCLick={() => {
                setStatus("edit")
                // setI
              }} title={"Редактировать"} />
              <ButtonCustom className={"button-on-comment button-remove"} handleCLick={() => {
                setStatus("default");

                if (comment.parent_id === null) {
                  dispatch(removeComment(commentID));
                } else {
                  return handleRemoveReply(comment.id);
                }

              }} title={"Удалить"} />
            </>
          )}
        </>
      )
    } else if (status === "edit") {
      setIsEditing(true)

      if (comment.user_id === currentUser.id && comment.task_id === task_id || comment.task_id === task_id || isEditing && commentIDClicked === comment.id) {
        return (
          <>
            <ButtonCustom className={"button-on-comment button-save"} handleCLick={() => {
              if (inputEditValues[comment.id].length > 0) {
                setEditError("");
                setStatus("default")
                setIsEditing(false);

                setInputEditValues({
                  ...inputEditValues,
                  [comment.id]: inputEditValues[comment.id]
                });

                dispatch(editComment(comment.id, inputEditValues[comment.id]));
              } else {
                setEditError("Поле не должно быть пустым!");
              }
            }} title={"Сохранить"} />
            <ButtonCustom className={"button-on-comment button-cancel"} handleCLick={() => {
              if (errorEdit !== "") setEditError("");
              setStatus("default")
              setIsEditing(false)

              setInputEditValues({
                ...inputEditValues,
                [comment.id]: comment.content
              });
            }} title={"Отменить"} />
          </>
        )
      } else if (status === "reply") {
        console.log("status: " + status);
      }
    }
}

export default ShowButtons;