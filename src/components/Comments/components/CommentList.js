import React, { useState } from "react";
import { useSelector } from "react-redux";
import IsAuth from "../../../hooks/IsAuth";
import moment from 'moment';
import ShowButtons from "./ShowButtons";

const CommentList = ({ task_id }) => {
  const commentsStore = useSelector(state => state.comments);
  const isAuth = IsAuth();
  const [inputEditValues, setInputEditValues] = useState({});
  const [commentIDClicked, setCommentIDClicked] = useState("");
  const [isEditing, setIsEditing] = useState(false);


  if (commentsStore.length !== 0) {
    return commentsStore.map((comment) => {
      if (comment.task_id === task_id) {
        return (
          <div className={"container-comment"} key={comment.id} onClick={() => {
            setCommentIDClicked(comment.id);
          }}>

            <div className={"content"}>
              {isEditing && commentIDClicked === comment.id ? (
                <input
                  className={"input-create-comment"}
                  value={inputEditValues[comment.id] || ""}
                  onChange={(val) => {
                    setInputEditValues({
                      ...inputEditValues,
                      [comment.id]: val.target.value
                    });
                  }}
                  placeholder={"Введите новый текст комментария..."}
                />
              ) : (
                <>
                  <p>User ID: {comment.user_id}.</p>
                  <p>Comment: {comment.content}.</p>
                  <p>Comment ID: {comment.id}.</p>
                  <p>Connect to Task ID: {comment.task_id}.</p>
                  <p>Date: {moment(comment.date).fromNow()}</p>
                </>
              )}
            </div>
            {isAuth && (
              <div className={"container-buttons"}>
                <ShowButtons
                  commentIDClicked={commentIDClicked}
                  comment={comment}
                  task_id={task_id}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  inputEditValue={inputEditValues[comment.id] || ""}
                  setInputEditValue={(value) => {
                    setInputEditValues({
                      ...inputEditValues,
                      [comment.id]: value
                    });
                  }}
                />
              </div>
            )}
          </div>
        );
      }

      return null;
    });

  } else {
    return <p>Комментариев не найдено!</p>;
  }
}

export default CommentList;