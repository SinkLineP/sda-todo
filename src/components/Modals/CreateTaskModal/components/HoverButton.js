import React, {useState} from "react";
import styles from "./HoverButton.module.css";
import {ReactComponent as IconApplyDeleteSVG} from "./icons/apply-delete.svg";

const HoverButton = ({ IconButton, onClick, titleButton, backgroundBeforeClick, backgroundAfterClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const customStyles = {
    backgroundColor: backgroundBeforeClick,
    color: "white",
  }

  if (isClicked) {
    customStyles.backgroundColor = backgroundAfterClick;
  } else {
    customStyles.backgroundColor = backgroundBeforeClick;
  }

  return (
    // <div className="container">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsClicked(false)
        }}
        className={`${styles.btn} no-select-text ${isHovered ? "hovered" : ""} shadow-box`}
        style={customStyles}
        onClick={() => {
          setIsClicked(true);
          setTimeout(() => {
            onClick();
            setIsClicked(false);
          }, 500);
        }}
      >
        <div className={`${styles.container_title_remove_task} ${isHovered ? styles.slide_out_left_title : ""}`}>
          <p>{titleButton}</p>
        </div>
        <div className={`${styles.container_icon_remove_task} ${isHovered ? styles.slide_out_left_icon : ""}`}>
          {isClicked ? (
            <IconApplyDeleteSVG className={styles.icon}/>
          ) : (
            <IconButton className={styles.icon}/>
          )}
        </div>
      </button>
    // </div>
  )
}


export default HoverButton;