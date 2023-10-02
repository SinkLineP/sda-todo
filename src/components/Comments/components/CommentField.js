import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import IsAuth from "../../../hooks/IsAuth";
import AuthModal from "../../AuthModal/AuthModal";
import CommentForm from "./CommentForm";


const CommentField = ({ task_id, setValue, value }) => {
  const isAuth = IsAuth();
  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <div className={"container-create-comment"}>
      {
        isAuth ? <CommentForm task_id={task_id} /> : (
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