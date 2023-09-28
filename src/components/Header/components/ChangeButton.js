import React from "react";
import IsAuth from "../../../hooks/IsAuth";


const ChangeButton = ({currentUser, onLogout, onOpen, currentForm}) => {
  if (IsAuth()) {
    return (
      <div>
        <span className={"user-header"}>Пользователь: {currentUser.username}</span>
        <button className={"btn-header btn-header-logout"} onClick={onLogout}>Выйти</button>
      </div>
    )
  } else {
    return (
      <button className={"btn-header btn-header-auth"} onClick={onOpen}>{currentForm === "login" ? ("Войти") : ("Зарегистрироваться")}</button>
    )
  }
}

export default ChangeButton;