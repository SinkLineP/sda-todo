import React from "react";
import IsAuth from "../../../hooks/IsAuth";
import {BiUserCircle} from "react-icons/bi";
import {TbLogout} from "react-icons/tb";
import {sliceTextForSmallScreen} from "../../../Functions";
import styles from "../../../pages/styles/SelectProject.module.css";


const ChangeButton = ({currentUser, onLogout, onOpen, currentForm}) => {
  if (IsAuth()) {
    return (
      <div className={"container_user_title"} style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          fontSize: "30px",
          color: "white"
        }}><BiUserCircle /></div>
        <div className={"user-header"}>:
          <span className={styles.title_project_1}>{currentUser.username}</span>
          <span className={styles.title_project_2}>{sliceTextForSmallScreen(currentUser.username)}</span>
        </div>
        <div>
          <button className={"btn-header btn-header-logout"} onClick={onLogout}><TbLogout /></button>
        </div>
      </div>
    )
  } else {
    return (
      <button className={"btn-header btn-header-auth"} onClick={onOpen}>{currentForm === "login" ? ("Войти") : ("Зарегистрироваться")}</button>
    )
  }
}

export default ChangeButton;