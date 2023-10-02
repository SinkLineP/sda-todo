import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../../store/Reducers/commentReducer";
import { v4 as uuid } from 'uuid';
import IsAuth from "../../../hooks/IsAuth";


const CommentField = ({ task_id, setValue, value }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const isAuth = IsAuth();

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
          <p className={"no-select-text title-not-auth"}>Войдите в свой профиль чтобы отсавить комментарий</p>
        )
      }
    </div>
  );
}

export default CommentField;