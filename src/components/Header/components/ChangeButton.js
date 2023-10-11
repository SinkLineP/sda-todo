import React from "react";
import IsAuth from "../../../hooks/IsAuth";
import {BiUserCircle} from "react-icons/bi";
import {TbLogout} from "react-icons/tb";


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
        <div className={"user-header"}>: {currentUser.username}</div>
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