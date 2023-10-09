import styles from "../CreateAndShowSubtask/components/ShowSubtask/ShowSubtasks.module.css";
import {editPriority} from "../../store/Reducers/subtaskReducer";
import React from "react";

const RangePriority = () => {
  return (
    <input
      ref={inputPriorityRef}
      className={`${styles.input} ${changeClassName(
        rangePriority,
        styles.priority_range_1,
        styles.priority_range_2,
        styles.priority_range_3
      )}`}
      type={"range"}
      min="0"
      max="2"
      step="1"
      disabled={setRangeValue(item.statusSubtask, "status").value === 2}
      value={rangePriority}
      onChange={(e) => {
        dispatch(editPriority(item.id, parseInt(e.target.value)));
        setRangePriority(parseInt(e.target.value))
      }}
      style={{cursor: "pointer"}}
    />
  )
}

export default RangePriority();