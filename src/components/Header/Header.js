import React, {useState} from "react";
import AuthModal from "../Modals/AuthModal/AuthModal";
import "./Header.css";
import {useDispatch, useSelector} from "react-redux";
import ChangeButton from "./components/ChangeButton";
import {useNavigate} from "react-router-dom";
import {logout} from "../../store/Actions/Actions";

export default function Header() {
  const [show, setShow] = useState(false);
  const currentUser = useSelector(state => state.auth.currentUser);
  const currentForm = useSelector(state => state.auth.currentForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      <div className={"page-header"}>
        <div className={'title-header-container'}>
          <p className={"title-header"}>SPA Todo Dashboard</p>
          <p className={"title-icon"}>🗂️</p>
        </div>

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