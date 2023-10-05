import React, {useState} from "react";
import styles from "./ShowSubtasks.module.css";
import IsAuth from "../../../../hooks/IsAuth";
import {useSelector} from "react-redux";

const ShowSubtasks = ({ data, setData, location }) => {
  const isAuth = IsAuth();
  const currentUser = useSelector(state => state.auth.currentUser);

  const deleteSubtask = (item) => {
    if (location === "create-task") {
      const updatedData = data.filter((item) => item.id !== item.id);

      return setData(updatedData);
    } else {
      console.log("with dispatch!");
    }
  };
  const editSubtask = () => {
    if (location === "create-task") {
      console.log("local-subtask");
    } else {
      console.log("with dispatch!");
    }
  };


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

export default ShowSubtasks;