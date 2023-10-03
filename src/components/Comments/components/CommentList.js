import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import IsAuth from "../../../hooks/IsAuth";
import moment from 'moment';
import ShowButtons from "./ShowButtons";
import ButtonCustom from "./ButtonCustom";
import {getUser, getUserWithParentID} from "../../../Variables";
import {AddReply} from "../functions";

const CommentList = ({ task_id, commentsStore }) => {
  const [inputEditValues, setInputEditValues] = useState({});
  const [inputReplyValues, setInputReplyValues] = useState({});
  const [commentIDClicked, setCommentIDClicked] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [statusComment, setStatusComment] = useState("default");
  const [errorReply, setErrorReply] = useState("");
  const currentUser = useSelector(state => state.auth.currentUser);
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const isAuth = IsAuth();


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
                <div className={"container-show-comment"}>
                  <div className={"container-show-comment-header"}>
                    <div className={"container-show-username"}><b>{getUser(comment.user_id, usersStore).username}</b>{comment.parent_id !== null && (<span>, ответил пользователю: <b>{getUserWithParentID(comment, usersStore, commentsStore).username}</b></span>)}</div>
                    <div className={"container-dote-for-title"}>•</div>
                    <div className={"container-show-date"}>{moment(comment.date).fromNow()}</div>
                    <div></div>
                  </div>
                  <div>
                    <p>{comment.content}</p>
                  </div>
                  {/*<p>User ID: {comment.user_id}.</p>*/}
                  {/*<p>Comment: {comment.content}.</p>*/}
                  {/*<p>Comment ID: {comment.id}.</p>*/}
                  {/*<p>Comment parent ID: {comment.parent_id}.</p>*/}
                  {/*<p>Connect to Task ID: {comment.task_id}.</p>*/}
                  {/*<p>Date: {moment(comment.date).fromNow()}</p>*/}
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
                    setStatusComment={setStatusComment}
                    statusComment={statusComment}
                  />
                </div>
              )}

              {isAuth && statusComment === "reply" && commentIDClicked === comment.id ? (
                <div className={"container-reply-input"}>
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
                          console.log();
                          AddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setStatusComment, setInputReplyValues);
                        }
                      }}
                    />

                    <ButtonCustom className={"button-on-comment button-remove"} title={"Отменить"} handleCLick={() => {
                      if (errorReply !== "") setErrorReply("");

                      setStatusComment("default")
                      setInputReplyValues({
                        ...inputReplyValues,
                        [comment.id]: ""
                      });
                    }} />
                    <ButtonCustom className={"button-on-comment button-reply"} title={"Ответить"} handleCLick={() => {
                      AddReply(comment, setErrorReply, dispatch, task_id, currentUser, inputReplyValues, setStatusComment, setInputReplyValues);
                    }} />
                  </div>
                </div>
              ) : null}

              <div>
                {isAuth && comment.comments.length !== 0 && (
                  <div className={"container-reply"}>
                    <CommentList commentsStore={comment.comments} task_id={task_id} />
                    <p className={"reply-label"}>Ответы: </p>
                  </div>
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