import React from "react";
import "./ScrollableWrap.css";

export default function ScrollableWrap({ children, widthContainer }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: `${widthContainer}px`,
      overflow: "auto",
      padding: "10px"
    }}>
      {children}
    </div>
  )
}