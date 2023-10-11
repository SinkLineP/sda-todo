import React from "react";
import styles from "../ShowSubtasks.module.css";
import {setRangeValuePriority, setRangeValueStatus, sliceTextForSmallScreen} from "../../../../../Functions";


const RangeWrap = ({label, subtask, location, currentStatus, children, type}) => {
  return (
    <div>
      <div className={`${styles.title_status} no-select-text`}>
        <span className={styles.title_status_1}>
          {label}: <span style={{color: type === "status" ? setRangeValueStatus(subtask).color : setRangeValuePriority(subtask).color}}>{subtask.toUpperCase()}</span>
        </span>
        <span className={styles.title_status_2}>
          {label.slice(0, 1)}.. : <span style={{color: type === "status" ? setRangeValueStatus(subtask).color : setRangeValuePriority(subtask).color}}>{subtask.toUpperCase().slice(0, 1)}</span>
        </span>
      </div>
      {currentStatus !== undefined && (
        <div>
          {location === "info" && currentStatus.status !== "done" && children}
        </div>
      )}
    </div>
  )
}

export default RangeWrap;