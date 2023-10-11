import React from "react";
import styles from "../ShowSubtasks.module.css";
import {deleteSubtask} from "../Functions";
import {useDispatch} from "react-redux";
import {removeSubtask, removeSubtaskFromTask} from "../../../../../store/Actions/Actions";
import {BsFillTrashFill} from "react-icons/bs";


const DeleteSubtaskButton = ({ item, location, setData, task_id, data }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.delete}
      onClick={
        () => deleteSubtask(item, location, setData, task_id, data, () => {
          dispatch(removeSubtask(item.id));
          dispatch(removeSubtaskFromTask(item.id, task_id))
        })
      }><BsFillTrashFill/></button>
  )
}

export default DeleteSubtaskButton;