import React, {useState} from "react";
import Modal from "react-modal";
import {getAuthorProject} from "../../Variables";
import {useSelector} from "react-redux";
import ColorizeWrapText from "../ColorizeWrapText/ColorizeWrapText";
import "./InfoTask.css";
import iconFile from "./icons/file.png";
import iconDownload from "./icons/download.png";


Modal.setAppElement("#root");

export default function InfoTask({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);

  const handleDownloadClick = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert('Выберите файл для скачивания.');
    }
  };

  return (
    <Modal isOpen={show} onRequestClose={onClose} overlayClassName={"overlay"}>
      <div className={"container-info-task"}>
        <div className={"close-btn-ctn"}>
          <div className={"container-title"}>
            <ColorizeWrapText text={item.status} label={`${item.title} #${item.numberTask}`} />

            <p>Автор: {getAuthorProject(item.author, usersStore)}</p>
          </div>

          <button className={"close-btn"} onClick={onClose}>X</button>
        </div>
        <div>
          <div className={"task-description"}>
            <h2>Описание задачи:</h2>
            <p>{item.description}</p>
          </div>


          <ColorizeWrapText text={item.priority} label={"Приоритет задачи: "} />

          <h2>Вложеные файлы:</h2>
          <div className={"file-list"}>
            {item.files.map((file) => (
              <div className={"container-file"} onClick={() => {
                handleDownloadClick(file)
              }}>
                <img className={"icon-file"} src={iconFile} alt={"icon file"} />
                <img className={"icon-file download-icon"} src={iconDownload} alt={"icon download file"} />
                <p className={"no-select-text file-title"}>{file.name.length > 10 ? `${file.name.substring(0, 7)}...` : file.name}</p>
              </div>
            ))}
          </div>


          <h2>Подзадачи:</h2>
          <p>{item.subtasks.length === 0 ? ("Подзадач нету") : item.subtasks.map((subtask) => (subtask + ", "))}</p>

          <div>
            <h2>Комментарии</h2>
            <textarea>

            </textarea>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2rem"
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

