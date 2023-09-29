import React from "react";
import Modal from "react-modal";
import {getAuthorProject, StatusColor} from "../../Variables";
import {useSelector} from "react-redux";


Modal.setAppElement("#root");

export default function Window({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);


  return (
    <Modal isOpen={show} onRequestClose={onClose} overlayClassName={"overlay"}>
      <div style={{
        position: "relative",
        height: "100%"
      }}>
        <div className={"close-btn-ctn"}>
          <div style={{ width: "100%" }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}>
              <h1 style={{ display: "block" }}>{item.title} #{item.numberTask}</h1>
              <p style={{
                backgroundColor: StatusColor(item.status),
                color: "white",
                height: "1.5rem",
                padding: "0 10px 0 10px",
                borderRadius: "1rem",
                fontSize: "1.2rem",
                marginLeft: "1.5rem"
              }}>{item.status}</p>
            </div>

            <p>Автор: {getAuthorProject(item.author, usersStore)}</p>
          </div>

          <button className={"close-btn"} onClick={onClose}>X</button>
        </div>
        <div>
          <h2>Приоритет задачи: {item.priority}</h2>


          <h2>Описание задачи:</h2>
          <p>{item.description}</p>


          <h2>Вложеные файлы:</h2>
          <p>{item.files.map((file) => (file.name + ", "))}</p>

          <h2>Подзадачи:</h2>
          <p>{item.subtasks.length === 0 ? ("Подзадач нету") : item.subtasks.map((subtask) => (subtask + ", "))}</p>

          <div>
            <h2>Комментарии</h2>
            <textarea>

            </textarea>
          </div>
        </div>
        <div style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "row"
        }}>
          <p>Дата создания задачи: {item.dateOfCreation}</p>

          {item.endDate !== null ? (
            <p style={{
            marginLeft: "30px"
          }}>Дата окончания задачи: {item.endDate}</p>
          ) : ("")}

          {item.timeInWork !== null ? (
            <p style={{
              marginLeft: "30px"
            }}>Время в работе: {item.timeInWork}</p>
          ) : ("")}
        </div>
      </div>
    </Modal>
  )
}

