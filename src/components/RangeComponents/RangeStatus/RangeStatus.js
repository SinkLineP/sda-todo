import React from "react";
import styles from "./RangeStatus.module.css";
import {changeClassName} from "../Functions";

const RangeStatus = ({ item, disabled, rangeStatus, setRangeStatus, dispatchFunc }) => {
  return (
    <input
      className={`
        ${styles.input} 
        ${changeClassName(
          rangeStatus.value.toString(),
          styles.status_range_1,
          styles.status_range_2,
          styles.status_range_3
        )}
      `}
      type={"range"}
      min="0"
      max="2"
      step="1"
      disabled={disabled}
      value={rangeStatus.value.toString()}
      onChange={(e) => {
        dispatchFunc && dispatchFunc(e);
        setRangeStatus({
          id: item.id,
          value: parseInt(e.target.value)
        });
      }}
    />
  )
}

export default RangeStatus;