import React, {useState} from "react";
import CommentField from "./components/CommentField";
import CommentList from "./components/CommentList";
import "./Comment.css";


export default function Comments({ task_id }) {
  const [value, setValue] = useState("");

  return (
    <>
      <CommentField task_id={task_id} value={value} setValue={setValue} />

      <div className={"container-all-comments"}>
        <CommentList task_id={task_id} />
      </div>
    </>
  )
}