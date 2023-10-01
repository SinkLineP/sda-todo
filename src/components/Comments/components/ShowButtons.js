import React, {useState} from "react";
import ButtonCustom from "./ButtonCustom";
import {removeComment} from "../../../store/Reducers/commentReducer";
import {useDispatch, useSelector} from "react-redux";

const ShowButtons = ({ commentID , comment, task_id, setIsEditing, isEditing, setInputEditValue, inputEditValue }) => {
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
    } else if (status === "reply" || status === "edit") {
      if (status === "edit") {
        setIsEditing(true)
      }

      if (comment.user_id === currentUser.id && comment.task_id === task_id) {
        return (
          <>
            <ButtonCustom className={"button-on-comment button-save"} handleCLick={() => {
              setStatus("default")
            }} title={"Сохранить"} />
            <ButtonCustom className={"button-on-comment button-cancel"} handleCLick={() => {
              setStatus("default")
              setIsEditing(false)
            }} title={"Отменить"} />
          </>
        )
      } else {
        return (
          <ButtonCustom className={"button-on-comment button-reply"} handleCLick={() => {
            setStatus("reply")
          }} title={"Ответить"} />
        )
      }
    }
  // }
}

export default ShowButtons;