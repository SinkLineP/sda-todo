import React, { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckStatusReplyComments,
  EditReply
} from "../functions";
import {removeComment, removeCommentFromTask, removeReply} from "../../../store/Actions/Actions";
import {BsFillReplyAllFill, BsFillReplyFill, BsFillTrashFill} from "react-icons/bs";
import {BiSolidEditAlt} from "react-icons/bi";
import {IoIosSave} from "react-icons/io";
import {GiCancel} from "react-icons/gi";

const ShowButtons = ({
  commentID,
  comment,
  task_id,
  setIsEditing,
  isEditing,
  commentIDClicked,
  inputEditValues,
  setInputEditValues,
  setEditError,
  errorEdit,
  setShowInputFromID,
  showInputFromID
}) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("default");

  useEffect(() => {
    const status = CheckStatusReplyComments(showInputFromID, comment.id);
  }, [showInputFromID, comment.id]);

  const handleRemoveReply = (commentId) => {
    dispatch(removeReply(commentId));
    dispatch(removeCommentFromTask(commentId, task_id))
  };

  if (CheckStatusReplyComments(showInputFromID, comment.id) === "default") {
    return (
      <>
        <ButtonCustom
          className={"button-on-comment button-reply"}
          handleCLick={() => {
            setShowInputFromID(commentID, true, "reply");
          }}
          title={<BsFillReplyFill/>}
        />
        {comment.user_id === currentUser.id && (
          <>
            <ButtonCustom
              className={"button-on-comment button-edit"}
              handleCLick={() => {
                setShowInputFromID(commentID, false, "edit");
              }}
              title={<BiSolidEditAlt/>}
            />
            <ButtonCustom
              className={"button-on-comment button-remove"}
              handleCLick={() => {
                setStatus("default");

                if (comment.parent_id === null) {
                  dispatch(removeComment(commentID));
                  dispatch(removeCommentFromTask(commentID, task_id))
                } else {
                  return handleRemoveReply(comment.id);
                }
              }}
              title={<BsFillTrashFill/>}
            />
          </>
        )}
      </>
    );
  } else if (CheckStatusReplyComments(showInputFromID, comment.id) === "edit") {
    if (
      comment.user_id === currentUser.id &&
      comment.task_id === task_id &&
      !isEditing &&
      commentIDClicked !== comment.id
    ) {
      setIsEditing(true);
      setInputEditValues({
        ...inputEditValues,
        [comment.id]: comment.content,
      });
    }
    return (
      <>
        <ButtonCustom
          className={"button-on-comment button-save"}
          handleCLick={() => {
            EditReply(
              comment,
              dispatch,
              inputEditValues,
              setEditError,
              setStatus,
              setIsEditing,
              setInputEditValues
            );

            setShowInputFromID(commentID, false, "default");
          }}
          title={<IoIosSave/>}
        />
        <ButtonCustom
          className={"button-on-comment button-cancel"}
          handleCLick={() => {
            if (errorEdit !== "") setEditError("");
            setStatus("default");
            setIsEditing(false);
            setInputEditValues({
              ...inputEditValues,
              [comment.id]: comment.content,
            });
            setShowInputFromID(commentID, false, "default");
          }}
          title={<GiCancel/>}
        />
      </>
    );
  } else return null;
};

export default ShowButtons;