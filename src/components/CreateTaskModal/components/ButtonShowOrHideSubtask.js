import React from "react";
import styles from "./ButtonShowOrHideSubtask.module.css";

const ButtonShowOrHideSubtask = ({ title, func }) => {
  return (
    <p className={`${styles.btn_subtask} ${styles.show_or_hide_subtask}`} onClick={func}>{title}</p>
  )
}

export default ButtonShowOrHideSubtask;