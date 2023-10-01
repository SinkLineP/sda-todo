import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../../store/Reducers/commentReducer";
import { v4 as uuid } from 'uuid';
import {getCurrentDate} from "../../../Variables";


const CommentField = ({ task_id, data }) => {
  const [value, setValue] = useState("");
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type={"text"}
        placeholder={"Введите комментарий..."}
        value={value}
        onChange={(val) => setValue(val.target.value)}
      />

      <button
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
      >Отправить</button>
    </div>
  );
}

export default CommentField;