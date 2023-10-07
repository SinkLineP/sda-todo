import React, {useEffect, useState} from "react";
import styles from "./ShowSubtasks.module.css";
import IsAuth from "../../../../hooks/IsAuth";
import {useDispatch, useSelector} from "react-redux";
import {editPriority, editStatus, removeSubtask} from "../../../../store/Reducers/subtaskReducer";
import {removeSubtaskFromTask} from "../../../../store/Reducers/taskReducer";
import {StatusesColors} from "../../../../Functions";

const ShowSubtasks = ({ task_id, setData, data, location, item }) => {
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

  const setRangeValue = (value, type) => {
    if (type === "status") {
      if (value === "queue") {
        return {
          value: 0,
          color: StatusesColors.Queue,
        };
      } else if (value === "development") {
        return {
          value: 1,
          color: StatusesColors.Development,
        };
      } else if (value === "done") {
        return {
          value: 2,
          color: StatusesColors.Done,
        };
      }
    } else if (type === "priority") {
      if (value === "low") {
        return {
          value: 0,
          color: StatusesColors.Queue,
        };
      } else if (value === "medium") {
        return {
          value: 1,
          color: StatusesColors.Development,
        };
      } else if (value === "height") {
        return {
          value: 2,
          color: StatusesColors.Height,
        };
      }
    }
  }

  const changeClassName = (value, class1, class2, class3) => {
    const nValue = Number(value);
    if (nValue === 0) {
      return class1;
    } else if (nValue === 1) {
      return class2;
    } else if (nValue === 2) {
      return class3;
    }
  }

  const [rangeStatus, setRangeStatus] = useState(setRangeValue(item.statusSubtask, "status").value);
  const [rangePriority, setRangePriority] = useState(setRangeValue(item.prioritySubtask, "priority").value);

  return (
    <div key={item.id} className={`${styles.list} shadow-box`}>
      <div className={`${styles.container} shadow-box`}>
        <div style={{
        }}>
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

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
          paddingLeft: "5%"
        }}>
          <div>
            <div style={{
              fontWeight: "bold"
            }}>Статус: <span style={{
              fontWeight: "bold",
              color: setRangeValue(item.statusSubtask, "status").color
            }}>{item.statusSubtask.toUpperCase()}</span></div>
            {location === "info" && (<input className={changeClassName(rangeStatus, styles.status_range_1, styles.status_range_2, styles.status_range_3)} type={"range"} min="0" max="2" step="1"
             value={rangeStatus}
             onChange={(e) => {
               dispatch(editStatus(item.id, parseInt(e.target.value)));
               setRangeStatus(e.target.value)
             }}
             style={{cursor: "pointer"}}
            />)}
          </div>



          <div>
            <div style={{
              fontWeight: "bold"
            }}>Приоритет: <span style={{
              fontWeight: "bold",
              color: setRangeValue(item.prioritySubtask, "priority").color
            }}>{item.prioritySubtask.toUpperCase()}</span></div>
            {location === "info" && (<input type={"range"} min="0" max="2" step="1"
                   value={rangePriority}
                   onChange={(e) => {
                     dispatch(editPriority(item.id, parseInt(e.target.value)));
                     setRangePriority(parseInt(e.target.value))
                   }}
                   style={{cursor: "pointer"}}
            />)}
          </div>
        </div>

        {isAuth && currentUser.id === item.author && (
          <div className={styles.container_buttons} style={{
          }}>
            <button className={styles.edit} onClick={() => editSubtask(item.id)}>Редактировать</button>
            <button className={styles.delete} onClick={() => deleteSubtask(item)}>Удалить</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowSubtasks;