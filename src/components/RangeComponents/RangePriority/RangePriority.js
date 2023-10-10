import React from "react";
import styles from "./RangePriority.module.css";
import {changeClassName} from "../Functions";

const RangePriority = ({ item, disabled, rangePriority, setRangePriority, dispatchFunc }) => {
  return (
    <input
      className={`
        ${styles.input} 
        ${changeClassName(
          rangePriority.value.toString(),
          styles.priority_range_1,
          styles.priority_range_2,
          styles.priority_range_3
        )}
      `}
      type={"range"}
      min="0"
      max="2"
      step="1"
      disabled={disabled}
      value={rangePriority.value.toString()}
      onChange={(e) => {
        dispatchFunc && dispatchFunc(e);
        setRangePriority({
          id: item.id,
          value: parseInt(e.target.value)
        });
      }}
    />
  )
}

export default RangePriority;