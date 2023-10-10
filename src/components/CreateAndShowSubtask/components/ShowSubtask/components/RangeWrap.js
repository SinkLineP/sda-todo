import React from "react";
import styles from "../ShowSubtasks.module.css";
import {setRangeValuePriority, setRangeValueStatus} from "../../../../../Functions";


const RangeWrap = ({label, subtask, location, currentStatus, children, type}) => {
  return (
    <div>
      <div className={`${styles.title_status} no-select-text`}>{label}: <span style={{
        color: type === "status" ? setRangeValueStatus(subtask).color : setRangeValuePriority(subtask).color
      }}>{subtask.toUpperCase()}</span></div>
      {currentStatus !== undefined && (
        <div>
          {location === "info" && currentStatus.status !== "done" && children}
        </div>
      )}
    </div>
  )
}

export default RangeWrap;