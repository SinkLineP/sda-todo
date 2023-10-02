import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../../store/Reducers/commentReducer";
import { v4 as uuid } from 'uuid';
import IsAuth from "../../../hooks/IsAuth";
import AuthModal from "../../AuthModal/AuthModal";


const CommentField = ({ task_id, setValue, value }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const isAuth = IsAuth();
  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <div className={"container-create-comment"}>
      {
        isAuth ? (
          <>
            <input
              className={"input-create-comment"}
              type={"text"}
              placeholder={"Введите комментарий..."}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />

            <button
              className={"button-create-comment"}
              onClick={() => {
                dispatch(addComment({
                  id: uuid(),
                  task_id: task_id,
                  user_id: currentUser.id,
                  content: value,
                  date: new Date(),
                  parent_id: null,
                  comments: []
                }))

                setValue("");
              }}
            >
              <span>Отправить</span>
            </button>
          </>
        ) : (
          <p className={"no-select-text title-not-auth"}><span className={"link-auth"} onClick={() => onOpen()}>Войдите</span> в свой профиль чтобы отсавить комментарий</p>
        )
      }

      <AuthModal
        onClose={onClose}
        show={show}
      />
    </div>
  );
}

export default CommentField;