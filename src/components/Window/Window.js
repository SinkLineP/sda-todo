import React from "react";
import Modal from "react-modal";


Modal.setAppElement("#root");

export default function Window({ show, onClose, item }) {
  return (
    <Modal isOpen={show} onRequestClose={onClose} overlayClassName={"overlay"}>
      <div style={{
        position: "relative",
        height: "100%"
      }}>
        <div className={"close-btn-ctn"}>
          <h1 style={{ flex: "1 90%" }}>{item.title} #{item.id}</h1>
          <button className={"close-btn"} onClick={onClose}>X</button>
        </div>
        <div>
          <h2>Описание задачи:</h2>
          <p>{item.description}</p>
          <h2>Status</h2>
          <p>{item.status}</p>


        </div>
        <div style={{
          position: "absolute",
          bottom: 0,
        }}>
          <p>Дата создания задачи: {item.dateOfCreation}</p>
        </div>
      </div>
    </Modal>
  )
}

