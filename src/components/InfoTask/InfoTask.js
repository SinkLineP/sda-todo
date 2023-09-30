import React from "react";
import Modal from "react-modal";
import {formatFileSize, getAuthorProject} from "../../Variables";
import {useDispatch, useSelector} from "react-redux";
import ColorizeWrapText from "../ColorizeWrapText/ColorizeWrapText";
import "./InfoTask.css";
import iconFile from "./icons/file.png";
import iconDownload from "./icons/download.png";
import ScrollableWrap from "../ScrollableWrap/ScrollableWrap";
import {removeTask} from "../../store/Reducers/taskReducer";
import IsAuth from "../../hooks/IsAuth";

Modal.setAppElement("#root");

export default function InfoTask({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

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

  const showShortNameFile = (fileName, maxShowSymbols) => {
    const lastIndex = fileName.lastIndexOf(".");

    if (lastIndex !== -1) {
      const fileExtension = fileName.substring(lastIndex, fileName.length);
      return `${fileName.substring(0, maxShowSymbols)}...${fileExtension}`;
    }

    return fileName.substring(0, maxShowSymbols);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "80%",
      height: "90%"
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <div className={"container-info-task"}>
        <div className={"close-btn-ctn"}>
          <div className={"container-title"}>
            <ColorizeWrapText text={item.status} label={`${item.title} #${item.numberTask}`} type={"title"} />

            <p>Автор: {getAuthorProject(item.author, usersStore)}</p>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            {IsAuth() && currentUser.id === item.author ? (
              <button style={{
                backgroundColor: "red",
                border: "none",
                padding: "1rem",
                borderRadius: "1rem",
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
                cursor: "pointer"
              }} onClick={() => {
                dispatch(removeTask(item.id));
              }}>удалить задачу</button>
            ) : ("")}
            {/*<button>edit</button>*/}
          </div>
        </div>
        <div>
          <div className={"task-description"}>
            <h3>Описание задачи:</h3>
            <p>{item.description}</p>
          </div>


          <ColorizeWrapText text={item.priority} label={"Приоритет задачи: "} type={"text"} />

          {item.files !== null ? (
            <>
              <h3>Вложеные файлы: ({item.files.length})</h3>
              <ScrollableWrap>
                {item.files.map((file, index) => {
                  const filesArrayLength = item.files.length;
                  const currentIndex = index + 1;

                  return (
                    <div className={`container-file ${filesArrayLength !== currentIndex ? "space-between-elements" : ""}`}
                         onClick={() => {
                           handleDownloadClick(file)
                         }}>
                      <img className={"icon-file"} src={iconFile} alt={"icon file"}/>
                      <img className={"icon-file download-icon"} src={iconDownload} alt={"icon download file"}/>
                      <p className={"no-select-text file-title"}>{file.name.length > 10 ? `${showShortNameFile(file.name, 8)}` : file.name}</p>
                      <p className={"no-select-text file-size"}>({formatFileSize(file.size)})</p>
                    </div>
                  )
                })}
              </ScrollableWrap>
            </>
          ) : (
            <>
              <h3>Вложеных файлов не найдено!</h3>
            </>
          )}

          {item.subtasks.length !== 0 ? (
            <>
              <h3>Подзадачи:</h3>
              <p>{item.subtasks.length === 0 ? ("Подзадач нету") : (
                <table style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  borderRadius: "0.3rem",
                  overflow: "hidden",
                  border: "solid",
                  borderColor: "black",
                  borderWidth: "1px"
                }}>
                  <thead>
                  <tr style={{
                    backgroundColor: "#054F7C",
                    color: "white",
                  }}>
                    <th>Заголовок подзадачи</th>
                    <th>Номер подзадачи</th>
                    <th>Описание подзадачи</th>
                    <th>Приоритет подзадачи</th>
                    <th>Статус подзадачи</th>
                  </tr>
                  </thead>
                  <tbody style={{
                    backgroundColor: "#fff0dc",
                  }}>
                  {
                    item.subtasks.map(subtask => {
                      return (
                        <tr>
                          <td>
                            {subtask.titleSubtask}
                          </td>
                          <td>
                            {subtask.numberSubtask}
                          </td>
                          <td>
                            {subtask.descriptionSubtask}
                          </td>
                          <td>
                            {subtask.prioritySubtask}
                          </td>
                          <td>
                            {subtask.statusSubtask}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
              )}</p>
            </>
          ) : (
            <>
              <h3>Подзадач не найдено!</h3>
            </>
          )}
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

