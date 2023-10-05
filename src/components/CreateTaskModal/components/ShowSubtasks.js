import React from "react";
import styles from "./ShowSubtasks.module.css";

const ShowSubtasks = ({ data }) => {
  if (data.length !== 0) {
    console.log(data);
    return data.map((item) => {
      return (
        <div className={styles.container}>
          <div>
            <div>
              <div>
                <p>{item.titleSubtask} #{item.numberSubtask}</p>
              </div>
            </div>

            <div>
              <p>{item.descriptionSubtask}</p>
            </div>
          </div>


          <div className={styles.container_buttons}>
            <button className={styles.edit}>edit</button>
            <button className={styles.delete}>delete</button>
          </div>
        </div>
      )
    })
  }
}

export default ShowSubtasks;