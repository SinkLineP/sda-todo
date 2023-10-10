import React from "react";
import styles from "./ScrollableWrap.module.css";

export default function ScrollableWrap({ children }) {
  return (
    <div className={styles.scrollable_wrap_container}>
      {children}
    </div>
  )
}