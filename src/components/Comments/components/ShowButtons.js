import React, {useState} from "react";
import ButtonCustom from "./ButtonCustom";
import {editComment, removeComment} from "../../../store/Reducers/commentReducer";
import {useDispatch, useSelector} from "react-redux";

const ShowButtons = ({ commentID , comment, task_id, setIsEditing, isEditing, commentIDClicked, inputEditValues, setInputEditValues }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("default");

  // if (commentIDClicked === commentID) {
    if (status === "default") {
      return (
        <>
          <ButtonCustom className={"button-on-comment button-reply"} handleCLick={() => {
            setStatus("reply")
          }} title={"Ответить"} />
          {comment.user_id === currentUser.id && (
            <>
              <ButtonCustom className={"button-on-comment button-edit"} handleCLick={() => {
                setStatus("edit")
                // setI
              }} title={"Редактировать"} />
              <ButtonCustom className={"button-on-comment button-remove"} handleCLick={() => {
                setStatus("default")
                dispatch(removeComment(commentID))
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
              setStatus("default")

              setIsEditing(false);

              setInputEditValues({
                ...inputEditValues,
                [comment.id]: inputEditValues[comment.id]
              });

              dispatch(editComment({
                commentID: comment.id,
                updatedComment: inputEditValues[comment.id]
              }));
            }} title={"Сохранить"} />
            <ButtonCustom className={"button-on-comment button-cancel"} handleCLick={() => {
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
  // }
}

// setInputEditValues({
//   ...inputEditValues,
//   [comment.id]: val.target.value
// });

export default ShowButtons;