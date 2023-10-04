import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import IsAuth from "../../../hooks/IsAuth";
import moment from 'moment';
import ShowButtons from "./ShowButtons";
import ButtonCustom from "./ButtonCustom";
import {getUser} from "../../../Variables";
import {
  AddReply,
  CheckActiveComments,
  CheckActiveReplyComments,
  CheckStatusReplyComments,
  setActiveReplyComments
} from "../functions";

const CommentList = ({ task_id, commentsStore }) => {
  const [inputEditValues, setInputEditValues] = useState({});
  const [inputReplyValues, setInputReplyValues] = useState({});
  const [commentIDClicked, setCommentIDClicked] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorReply, setErrorReply] = useState("");
  const [errorEdit, setErrorEdit] = useState("");
  const [isShowComments, setIsShowComments] = useState({
    status: false,
    title: "Показать комментарии"
  });
  const currentUser = useSelector(state => state.auth.currentUser);
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const isAuth = IsAuth();
  // const [status, setStatus] = useState(null);
  const [showInputFromID, setShowInputFromID] = useState([{}]);




  if (commentsStore.length !== 0) {
    return commentsStore.map((comment) => {
      if (comment.task_id === task_id) {
        return (
          <div className={"container-tree-comments"} key={comment.id} onClick={() => {
            setCommentIDClicked(comment.id);
          }}>

            <div className={"container-comment content"}>
              {isEditing && commentIDClicked === comment.id ? (
                <>
                  {errorEdit !== "" ? <div className={"errors-reply"}>{errorEdit}</div> : <div className={"errors"}></div>}

                  <input
                    className={"input-create-comment"}
                    value={inputEditValues[comment.id] ?? comment.content}
                    onChange={(e) => {
                      if (e.target.value.length > 0) setErrorEdit("");
                      if (e.target.value.length === 0) setErrorEdit("Поле не должно быть пустым!");

                      setInputEditValues({
                        ...inputEditValues,
                        [comment.id]: e.target.value
                      });
                    }}
                    placeholder={"Введите новый текст комментария..."}
                  />
                </>
              ) : (
                <div className={"container-show-comment"}>
                  <div className={"container-show-comment-header"}>
                    <div className={"container-show-username"}>Пользователь: <b>{getUser(comment.user_id, usersStore).username}</b></div>
                    <div className={"container-show-dote-for-title"}>•</div>
                    <div className={"container-show-date"}>Оставил комментарий: {moment(comment.date).fromNow()}</div>
                    <div></div>
                  </div>
                  <div className={"container-show-content"}>
                    <p>{comment.content}</p>
                    <p>Comment ID: {comment.id}</p>
                  </div>
                </div>
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
                    setEditError={setErrorEdit}
                    errorEdit={errorEdit}
                    setShowInputFromID={(commentId, isVisible, status) => {
                      setActiveReplyComments(commentId, isVisible, setShowInputFromID, status);
                    }}
                    showInputFromID={showInputFromID}
                  />
                </div>
              )}

              {isAuth && CheckActiveReplyComments(showInputFromID, comment.id) ? (
                <div className={"container-reply-input"}>
                  <>
                    {errorReply !== "" ? <div className={"errors-reply"}>{errorReply}</div> : <div className={"errors"}></div>}


                    <div className={"container-reply-comment content"}>
                      <input
                        className={"input-create-comment"}
                        value={inputReplyValues[comment.id] || ""}
                        onChange={(e) => {
                          if (e.target.value.length > 0) setErrorReply("");
                          if (e.target.value.length === 0) setErrorReply("Введите ответ...");

                          setInputReplyValues({
                            ...inputReplyValues,
                            [comment.id]: e.target.value
                          });


                        }}
                        placeholder={"Введите ответ..."}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            AddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setInputReplyValues, setShowInputFromID);
                            setIsShowComments({ status: true, title: "Скрыть комментарии" });
                          }
                        }}
                      />

                      <ButtonCustom className={"button-on-comment button-remove"} title={"Отменить"} handleCLick={() => {
                        if (errorReply !== "") setErrorReply("");
                        setInputReplyValues({
                          ...inputReplyValues,
                          [comment.id]: ""
                        });

                        setActiveReplyComments(comment.id, false, setShowInputFromID, "default");
                      }} />
                      <ButtonCustom className={"button-on-comment button-reply"} title={"Ответить"} handleCLick={() => {
                        AddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setInputReplyValues, setShowInputFromID);
                        setIsShowComments({ status: true, title: "Скрыть комментарии" });
                      }} />
                    </div>
                  </>
                </div>
              ): null}

              <div>
                {comment.comments.length !== 0 && (
                  <>
                    <hr style={{
                      marginTop: "2rem",
                      marginBottom: "1rem"
                    }} color={"lightgrey"} />
                    <p className={"reply-label"}>Ответы: </p>

                    <button
                      className={"reply-show-or-hide-comments"}
                      onClick={() => setIsShowComments({
                        status: !isShowComments.status,
                        title: !isShowComments.status ? "Скрыть комментарии" : "Показать комментарии"
                      })}
                    >
                      {isShowComments.title}{isShowComments.status ? <span className={"arrow"}> ▲</span> : <span className={"arrow"}> ▼</span>}
                    </button>

                    {
                      isShowComments.status && (
                        <div className={"container-reply"}>
                          <CommentList commentsStore={comment.comments} task_id={task_id} setIsShowComments={setIsShowComments} />
                        </div>
                      )
                    }
                  </>
                )}
              </div>
            </div>
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