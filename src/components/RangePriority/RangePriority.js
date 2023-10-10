import React, {useState} from "react";
import {setRangeValue, StatusesColors} from "../../Functions";
import styles from "./RangePriority.module.css";

const RangePriority = ({ item, disabled, rangePriority, setRangePriority, dispatchFunc }) => {
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