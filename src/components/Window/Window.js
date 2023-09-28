import React from "react";
import Modal from "react-modal";


Modal.setAppElement("#root");

export default function Window({ show, onClose, item }) {
  return (
    <Modal isOpen={show} onRequestClose={onClose} overlayClassName={"overlay"}>
      <div className={"close-btn-ctn"}>
        <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
        <button className={"close-btn"} onClick={onClose}>X</button>
      </div>
      <div>
        <h2>Desc</h2>
        <p>{item.descriprion}</p>
        <h2>Status</h2>
        <p>{item.status}</p>
      </div>
    </Modal>
  )
}

