import React, {useState} from "react";
import styles from "./ShowSubtasks.module.css";
import IsAuth from "../../../../hooks/IsAuth";
import {useDispatch, useSelector} from "react-redux";
import {removeSubtask} from "../../../../store/Reducers/subtaskReducer";
import {removeSubtaskFromTask} from "../../../../store/Reducers/taskReducer";

const ShowSubtasks = ({ task_id, setData, data, location }) => {
  const isAuth = IsAuth();
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  const deleteSubtask = (item) => {
    if (location === "form") {
      const updatedData = data.filter((subtask) => subtask.id !== item.id);

      return setData(updatedData);
    } else {
      dispatch(removeSubtask(item.id));

      dispatch(removeSubtaskFromTask(item.id, task_id))
    }
  };
  const editSubtask = () => {
    if (location === "create-task") {
      console.log("local-subtask");
    } else {
      console.log("with dispatch!");
    }
  };



  const Subtasks = ({data}) => {
    if (data.length !== 0) {
      return data.map((item, index) => {
        return (
          <div key={index} className={styles.container}>
            <div>
              <div>
                <div>
                  <p className={styles.title}>{item.titleSubtask} #{item.numberSubtask}</p>
                </div>
              </div>

              <div className={styles.container_desc}>
                <p className={styles.title}>Описание подзадачи: </p>
                <p className={styles.desc}>{item.descriptionSubtask}</p>
              </div>
            </div>


            {isAuth && currentUser.id === item.author && (
              <div className={styles.container_buttons}>
                <button className={styles.edit} onClick={() => editSubtask(item.id)}>edit</button>
                <button className={styles.delete} onClick={() => deleteSubtask(item)}>delete</button>
              </div>
            )}
          </div>
        )
      })
    }
  }

  return (
    <div className={styles.list}>
      <Subtasks data={data} />
    </div>
  )
}

export default ShowSubtasks;