import React from "react";
import styles from "./ShowSubtasks.module.css";
import IsAuth from "../../../hooks/IsAuth";
import {useSelector} from "react-redux";

const ShowSubtasks = ({ data }) => {
  const isAuth = IsAuth();
  const currentUser = useSelector(state => state.auth.currentUser);


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
              <button className={styles.edit}>edit</button>
              <button className={styles.delete}>delete</button>
            </div>
          )}
        </div>
      )
    })
  }
}

export default ShowSubtasks;