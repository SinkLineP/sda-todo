import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeComment} from "../../../store/Reducers/commentReducer";


const CommentList = ({ task_id }) => {
  const commentsStore = useSelector(state => state.comments);
  const [status, setStatus] = useState("default");
  const commentRef = useRef();
  const dispatch = useDispatch();

  const ButtonCustom = ({ title, handleCLick }) => {
    return (
      <button onClick={handleCLick}>
        {title}
      </button>
    )
  }

  const ShowButtons = ({ status, commentID }) => {
    if (status === "default") {
      return (
        <>
          <ButtonCustom handleCLick={() => {
            setStatus("reply")
          }} title={"Ответить"} />
          <ButtonCustom handleCLick={() => {
            setStatus("edit")
          }} title={"Редактировать"} />
          <ButtonCustom handleCLick={() => {
            setStatus("default")
            dispatch(removeComment(commentID))
          }} title={"Удалить"} />
        </>
      )
    } else if (status === "reply") {
      return (
        <>
          <ButtonCustom handleCLick={() => {
            setStatus("default")
          }} title={"Сохранить"} />
          <ButtonCustom handleCLick={() => {
            setStatus("default")
          }} title={"Отменить"} />
        </>
      )
    } else if (status === "edit") {
      return (
        <>
          <ButtonCustom handleCLick={() => {
            setStatus("default")
          }} title={"Сохранить"} />
          <ButtonCustom handleCLick={() => {
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
          <div ref={commentRef} className={"container-comment"} key={comment.id}>
            <div className={"content"}>
              <p>User ID: {comment.user_id}.</p>
              <p>Comment: {comment.content}.</p>
              <p>Comment ID: {comment.id}.</p>
              <p>Connect to Task ID: {comment.task_id}.</p>
            </div>

            <div className={"container-buttons"}>
              <ShowButtons status={status} commentID={comment.id} />
            </div>
          </div>
        );
      }
    })
  } else {
    return <p>Комментариев не найдено!</p>;
  }


}

export default CommentList;