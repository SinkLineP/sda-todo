import React, {useState} from "react";
import AuthModal from "../AuthModal/AuthModal";
import "./Header.css";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/Reducers/authReducer";
import IsAuth from "../../hooks/IsAuth";
import ChangeButton from "./components/ChangeButton";

export default function Header() {
  const [show, setShow] = useState(false);
  const currentUser = useSelector(state => state.auth.currentUser);
  const currentForm = useSelector(state => state.auth.currentForm);
  const dispatch = useDispatch();

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  const onLogout = () => {
    dispatch(logout())
  }




  return (
    <>
      <div className={"page-header"}>
        <p className={"title-header"}>SPA Todo Dashboard 🗂️</p>
        <ChangeButton
          currentUser={currentUser}
          currentForm={currentForm}
          onLogout={onLogout}
          onOpen={onOpen}
        />
      </div>
      <AuthModal
        onClose={onClose}
        show={show}
      />
    </>
  );
}