import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { editComment, removeComment, removeReply } from "../../../store/Reducers/commentReducer";
import { useDispatch, useSelector } from "react-redux";
import { EditReply } from "../functions";

const ShowButtons = ({
  commentID,
  comment,
  task_id,
  setIsEditing,
  isEditing,
  commentIDClicked,
  inputEditValues,
  setInputEditValues,
  setEditError,
  errorEdit,
  getStatus,
  newStatus,
  setShowInputFromID,
  showInputFromID
}) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("default");

  useEffect(() => {
    if (getStatus() !== null) setStatus(getStatus());
  }, [getStatus]);

  const handleRemoveReply = (commentId) => {
    dispatch(removeReply(commentId));
  };

  if (status === "default") {
    return (
      <>
        <ButtonCustom
          className={"button-on-comment button-reply"}
          handleCLick={() => {
            // setStatus("reply");
            // newStatus("reply");
            setShowInputFromID(commentID, true);
          }}
          title={"Ответить"}
        />
        {comment.user_id === currentUser.id && (
          <>
            <ButtonCustom
              className={"button-on-comment button-edit"}
              handleCLick={() => {
                setStatus("edit");
              }}
              title={"Редактировать"}
            />
            <ButtonCustom
              className={"button-on-comment button-remove"}
              handleCLick={() => {
                setStatus("default");

                if (comment.parent_id === null) {
                  dispatch(removeComment(commentID));
                } else {
                  return handleRemoveReply(comment.id);
                }
              }}
              title={"Удалить"}
            />
          </>
        )}
      </>
    );
  } else if (status === "edit") {
    if (
      comment.user_id === currentUser.id &&
      comment.task_id === task_id &&
      !isEditing &&
      commentIDClicked !== comment.id
    ) {
      setIsEditing(true);
      setInputEditValues({
        ...inputEditValues,
        [comment.id]: comment.content,
      });
    }
    return (
      <>
        <ButtonCustom
          className={"button-on-comment button-save"}
          handleCLick={() => {
            EditReply(
              comment,
              dispatch,
              inputEditValues,
              setEditError,
              setStatus,
              setIsEditing,
              setInputEditValues
            );
          }}
          title={"Сохранить"}
        />
        <ButtonCustom
          className={"button-on-comment button-cancel"}
          handleCLick={() => {
            if (errorEdit !== "") setEditError("");
            setStatus("default");
            setIsEditing(false);
            setInputEditValues({
              ...inputEditValues,
              [comment.id]: comment.content,
            });
          }}
          title={"Отменить"}
        />
      </>
    );
  }
};

export default ShowButtons;