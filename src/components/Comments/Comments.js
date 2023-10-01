import React from "react";
import CommentField from "./components/CommentField";
import CommentList from "./components/CommentList";
import "./Comment.css";


export default function Comments({ task_id }) {
  return (
    <>
      <CommentField task_id={task_id} />

      <div className={"container-all-comments"}>
        <CommentList task_id={task_id} />
      </div>
    </>
  )
}