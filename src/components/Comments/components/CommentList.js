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
  const currentDate = new Date();

  const ButtonCustom = ({ title, handleCLick }) => {
    return (
      <button onClick={handleCLick}>
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
          <div className={"container-comment"} key={comment.id}>
            <div className={"content"}>
              <p>User ID: {comment.user_id}.</p>
              <p>Comment: {comment.content}.</p>
              <p>Comment ID: {comment.id}.</p>
              <p>Connect to Task ID: {comment.task_id}.</p>
              <p>Date: {moment(comment.date).fromNow()}</p>
            </div>

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