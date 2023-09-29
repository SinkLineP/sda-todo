import React from "react";
import "./ScrollableWrap.css";

export default function ScrollableWrap({ children }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      overflow: "auto",
      padding: "10px"
    }}>
      {children}
    </div>
  )
}