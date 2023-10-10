import React, {useState} from "react";
import IsAuth from "../../../../hooks/IsAuth";
import {useDispatch, useSelector} from "react-redux";
import {setRangeValuePriority, setRangeValueStatus} from "../../../../Functions";
import RangePriority from "../../../RangeComponents/RangePriority/RangePriority";
import RangeStatus from "../../../RangeComponents/RangeStatus/RangeStatus";
import DeleteSubtaskButton from "./components/DeleteSubtaskButton";
import styles from "./ShowSubtasks.module.css";
import RangeWrap from "./components/RangeWrap";
import {editPrioritySubtask, editStatusSubtask} from "../../../../store/Actions/Actions";


const ShowSubtasks = ({ task_id, setData, data, location, item, currentItem }) => {
  const isAuth = IsAuth();
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

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

        <div className={styles.container_status_and_priority}>
          <RangeWrap location={location} label={"Статус"} subtask={item.statusSubtask} currentStatus={currentItem} type={"status"} >
            {IsAuth() && <RangeStatus
              item={item}
              rangeStatus={rangeStatus}
              setRangeStatus={(val) => setRangeStatus(val)}
              dispatchFunc={(e) => dispatch(editStatusSubtask(item.id, parseInt(e.target.value)))}
              disabled={location === "info" ? setRangeValueStatus(item.statusSubtask).value === 2 || currentItem.status === "queue" : setRangeValueStatus(item.statusSubtask).value === 2}
            />}
          </RangeWrap>

          <RangeWrap location={location} label={"Приоритет"} subtask={item.prioritySubtask} currentStatus={currentItem} type={"priority"} >
            {IsAuth() && <RangePriority
              rangePriority={rangePriority}
              item={item}
              setRangePriority={(val) => setRangePriority(val)}
              dispatchFunc={(e) => dispatch(editPrioritySubtask(item.id, parseInt(e.target.value)))}
              disabled={setRangeValueStatus(item.statusSubtask).value === 2}
            />}
          </RangeWrap>
        </div>

        {isAuth && currentUser.id === item.author && (
          <div className={styles.container_buttons}>
            {location !== "form" ? currentItem.status !== "done" && (
              <>
                {item.statusSubtask !== "done" && (
                  <DeleteSubtaskButton
                    item={item}
                    task_id={task_id}
                    location={location}
                    data={data}
                    setData={setData}
                  />
                )}
              </>
            ) : (
              <>
                <DeleteSubtaskButton
                  item={item}
                  task_id={task_id}
                  location={location}
                  data={data}
                  setData={setData}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


export default ShowSubtasks;