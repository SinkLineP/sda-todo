import React, {useState} from "react";
import styles from "./ShowSubtasks.module.css";
import IsAuth from "../../../../hooks/IsAuth";
import {useDispatch, useSelector} from "react-redux";
import {
  editPrioritySubtask,
  editStatusSubtask,
  removeSubtask
} from "../../../../store/Reducers/subtaskReducer";
import {removeSubtaskFromTask} from "../../../../store/Reducers/taskReducer";
import {setRangeValuePriority, setRangeValueStatus, StatusesColors} from "../../../../Functions";
import RangePriority from "../../../RangeComponents/RangePriority/RangePriority";
import RangeStatus from "../../../RangeComponents/RangeStatus/RangeStatus";

const ShowSubtasks = ({ task_id, setData, data, location, item, currentItem }) => {
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
    if (location === "form") {
      console.log("local-subtask");
    } else {
      console.log("with dispatch!");
    }
  };

  const [rangeStatus, setRangeStatus] = useState({
    id: null,
    value: setRangeValueStatus(item.statusSubtask).value,
  });

  const [rangePriority, setRangePriority] = useState({
    id: null,
    value: setRangeValuePriority(item.prioritySubtask).value,
  });

  return (
    <div key={item.id} className={`shadow-box`}>
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
          paddingLeft: "10%",
        }}>
          <div>
            <div className={"no-select-text"} style={{
              fontWeight: "bold"
            }}>Статус: <span style={{
              fontWeight: "bold",
              color: setRangeValueStatus(item.statusSubtask).color
            }}>{item.statusSubtask.toUpperCase()}</span></div>
            {location === "info" && currentItem.status !== "done" && (
              <RangeStatus
                item={item}
                rangeStatus={rangeStatus}
                setRangeStatus={(val) => setRangeStatus(val)}
                dispatchFunc={(e) => dispatch(editStatusSubtask(item.id, parseInt(e.target.value)))}
                disabled={setRangeValueStatus(item.statusSubtask).value === 2 || currentItem.status === "queue"}
              />

            )}
          </div>



          <div>
            <div className={"no-select-text"} style={{
              fontWeight: "bold"
            }}>Приоритет: <span style={{
              fontWeight: "bold",
              color: setRangeValuePriority(item.prioritySubtask).color
            }}>{item.prioritySubtask.toUpperCase()}</span></div>
            {location === "info" && currentItem.status !== "done" && (
              <RangePriority
                rangePriority={rangePriority}
                item={item}
                setRangePriority={(val) => setRangePriority(val)}
                dispatchFunc={(e) => dispatch(editPrioritySubtask(item.id, parseInt(e.target.value)))}
                disabled={setRangeValueStatus(item.statusSubtask).value === 2}
              />
            )}
          </div>
        </div>

        {isAuth && currentUser.id === item.author && (
          <div className={styles.container_buttons}>
            {location !== "form" ? currentItem.status !== "done" && (
              <>
                {currentItem.status !== "development" && item.statusSubtask !== "done" && (<button className={styles.edit} onClick={() => editSubtask(item.id)}>Редактировать</button>)}
                {item.statusSubtask !== "done" && (<button className={styles.delete} onClick={() => deleteSubtask(item)}>Удалить</button>)}
              </>
            ) : (
              <>
                <button className={styles.delete} onClick={() => deleteSubtask(item)}>Удалить</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowSubtasks;