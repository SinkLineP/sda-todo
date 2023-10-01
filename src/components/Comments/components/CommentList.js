import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeComment} from "../../../store/Reducers/commentReducer";
import IsAuth from "../../../hooks/IsAuth";
import moment from 'moment';



const CommentList = ({ task_id }) => {
  const commentsStore = useSelector(state => state.comments);
  const [status, setStatus] = useState("default");
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuth = IsAuth();
  const [inputEditValue, setInputEditValue] = useState("");

  const ButtonCustom = ({ title, handleCLick, className }) => {
    return (
      <button
        className={className}
        onClick={handleCLick}
      >
        {title}
      </button>
    )
  }

  const millisecondsToDays = (milliseconds) => {
    return milliseconds / (1000 * 60 * 60 * 24);
  }


  const ShowButtons = ({ status, commentID }) => {
    if (status === "default") {
      return (
        <>
          <ButtonCustom className={"button-on-comment button-reply"} handleCLick={() => {
            setStatus("reply")
          }} title={"Ответить"} />
          <ButtonCustom className={"button-on-comment button-edit"} handleCLick={() => {
            setStatus("edit")
          }} title={"Редактировать"} />
          <ButtonCustom className={"button-on-comment button-remove"} handleCLick={() => {
            setStatus("default")
            dispatch(removeComment(commentID))
          }} title={"Удалить"} />
        </>
      )
    } else if (status === "reply") {
      return (
        <>
          <ButtonCustom className={"button-on-comment button-save"} handleCLick={() => {
            setStatus("default")
          }} title={"Сохранить"} />
          <ButtonCustom className={"button-on-comment button-cancel"} handleCLick={() => {
            setStatus("default")
          }} title={"Отменить"} />
        </>
      )
    } else if (status === "edit") {
      return (
        <>
          <ButtonCustom className={"button-on-comment button-save"} handleCLick={() => {
            setStatus("default")
          }} title={"Сохранить"} />
          <ButtonCustom className={"button-on-comment button-cancel"} handleCLick={() => {
            setStatus("default")
          }} title={"Отменить"} />
        </>
      )
    }
  }

  if (commentsStore.length !== 0) {
    return commentsStore.map((comment) => {
      if (comment.task_id === task_id) {
        return (
          <div className={"container-comment"} key={comment.id}>
            {
              status === "edit" ? (
                <div className={"content"}>
                  <input
                    className={"input-create-comment"}
                    value={inputEditValue}
                    onChange={(val) => setInputEditValue(val.target.value)}
                    placeholder={"Введите новый текст комментария..."}
                  />
                </div>
              ) : (
                <div className={"content"}>
                  <p>User ID: {comment.user_id}.</p>
                  <p>Comment: {comment.content}.</p>
                  <p>Comment ID: {comment.id}.</p>
                  <p>Connect to Task ID: {comment.task_id}.</p>
                  <p>Date: {moment(comment.date).fromNow()}</p>
                </div>
              )
            }


            {
              isAuth && comment.user_id === currentUser.id && (
                <div className={"container-buttons"}>
                  <ShowButtons status={status} commentID={comment.id} />
                </div>
              )
            }

          </div>
        );
      }
    })
  } else {
    return <p>Комментариев не найдено!</p>;
  }


}

export default CommentList;