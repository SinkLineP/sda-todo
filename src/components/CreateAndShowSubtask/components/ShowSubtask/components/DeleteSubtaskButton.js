import React from "react";
import styles from "../ShowSubtasks.module.css";
import {deleteSubtask} from "../Functions";
import {removeSubtask} from "../../../../../store/Reducers/subtaskReducer";
import {useDispatch} from "react-redux";
import {removeSubtaskFromTask} from "../../../../../store/Actions/Actions";


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
      }>Удалить</button>
  )
}

export default DeleteSubtaskButton;