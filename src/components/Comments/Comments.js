import React from "react";
import CommentField from "./components/CommentField";
import CommentList from "./components/CommentList";


export default function Comments({ task_id }) {
  return (
    <>
      <CommentField task_id={task_id} />
      {/*<CommentList  />*/}
    </>
  )
}