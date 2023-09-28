import React, {useState} from "react";
import AuthModal from "../AuthModal/AuthModal";
import "./Header.css";

export default function Header() {
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <div className={"page-header"}>
        <p>SPA Todo Dashboard 🗂️</p>
        <button className={"button-auth"} onClick={onOpen}>SignUp</button>
      </div>
      <AuthModal onClose={onClose} show={show} />
    </>
  );
}