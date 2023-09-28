import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <div className={"page-header"}>
      <p>SPA Todo Dashboard 🗂️</p>
      <button className={"button-auth"}>SignUp</button>
    </div>
  );
}