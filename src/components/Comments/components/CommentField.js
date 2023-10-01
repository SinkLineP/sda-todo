import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../../store/Reducers/commentReducer";
import { v4 as uuid } from 'uuid';


const CommentField = ({ task_id, data }) => {
  const [value, setValue] = useState("");
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <div className={"container-create-comment"}>
      <input
        className={"input-create-comment"}
        type={"text"}
        placeholder={"Введите комментарий..."}
        value={value}
        onChange={(val) => setValue(val.target.value)}
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
            comments: []
          }))
        }}
      >
        <span>Отправить</span>
      </button>
    </div>
  );
}

export default CommentField;