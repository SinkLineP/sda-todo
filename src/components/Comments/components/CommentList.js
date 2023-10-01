import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import IsAuth from "../../../hooks/IsAuth";
import moment from 'moment';
import ShowButtons from "./ShowButtons";
import ButtonCustom from "./ButtonCustom";
import {addComment} from "../../../store/Reducers/commentReducer";
import {v4 as uuid} from "uuid";

const CommentList = ({ task_id }) => {
  const commentsStore = useSelector(state => state.comments);
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuth = IsAuth();
  const [inputEditValues, setInputEditValues] = useState({});
  const [inputReplyValues, setInputReplyValues] = useState({});
  const [commentIDClicked, setCommentIDClicked] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [statusComment, setStatusComment] = useState("default");
  const dispatch = useDispatch();

  const ReplyComment = (state, content) => {
    const index = state.findIndex(item => item.id === commentIDClicked && item.user_id === currentUser.id);

    console.log(state[index]);

    if (index !== -1) {
      return {
        ...state[index],
        comments: [...state[index].comments, {
          id: uuid(),
          task_id: task_id,
          user_id: currentUser.id,
          date: new Date(),
          content: content,
          comments: []
        }]
      };
    }

    return state;
  }

  useEffect(() => {
    console.log(commentsStore);
  }, [commentsStore])

  if (commentsStore.length !== 0) {
    return commentsStore.map((comment) => {
      if (comment.task_id === task_id) {
        return (
          <div className={"container-tree-comments"} key={comment.id} onClick={() => {
            setCommentIDClicked(comment.id);
          }}>

            <div className={"container-comment content"}>
              {isEditing && commentIDClicked === comment.id ? (
                <input
                  className={"input-create-comment"}
                  value={inputEditValues[comment.id] || comment.content}
                  onChange={(e) => {
                    setInputEditValues({
                      ...inputEditValues,
                      [comment.id]: e.target.value
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

              {isAuth && (
                <div className={"container-buttons"}>
                  <ShowButtons
                    commentID={comment.id}
                    commentIDClicked={commentIDClicked}
                    comment={comment}
                    task_id={task_id}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    inputEditValues={inputEditValues}
                    setInputEditValues={setInputEditValues}
                    setStatusComment={setStatusComment}
                    statusComment={statusComment}
                  />
                </div>
              )}
            </div>

            {isAuth && statusComment === "reply" && commentIDClicked === comment.id ? (
              <div className={"container-reply-comment content"}>
                <input
                  className={"input-create-comment"}
                  value={inputReplyValues[comment.id] || ""}
                  onChange={(e) => {
                    setInputReplyValues({
                      ...inputReplyValues,
                      [comment.id]: e.target.value
                    });
                  }}
                  placeholder={"Введите ответ..."}
                />

                <ButtonCustom className={"button-on-comment button-remove"} title={"Отменить"} handleCLick={() => {
                  setStatusComment("default")
                  setInputReplyValues({
                    ...inputReplyValues,
                    [comment.id]: ""
                  });
                }} />
                <ButtonCustom className={"button-on-comment button-reply"} title={"Ответить"} handleCLick={() => dispatch(addComment(ReplyComment(commentsStore, inputReplyValues[comment.id])))} />
              </div>
            ) : null}
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