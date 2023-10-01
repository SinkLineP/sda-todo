import React, {useState} from "react";
import CommentField from "./components/CommentField";
import CommentList from "./components/CommentList";
import "./Comment.css";
import {useSelector} from "react-redux";


export default function Comments({ task_id }) {
  const [value, setValue] = useState("");
  const commentsStore = useSelector(state => state.comments);


  return (
    <>
      <CommentField task_id={task_id} value={value} setValue={setValue} />

      <div className={"container-all-comments"}>
        <CommentList task_id={task_id} commentsStore={commentsStore} />
      </div>
    </>
  )
}