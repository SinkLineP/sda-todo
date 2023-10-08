import React, {useState} from "react";
import Modal from "react-modal";
import {
  calculateTimeInWork,
  formatFileSize,
  getAuthorProject,
  getCurrentDate, getSubtask, showShortNameFile
} from "../../Functions";
import {useDispatch, useSelector} from "react-redux";
import ColorizeWrapText from "../ColorizeWrapText/ColorizeWrapText";
import "./InfoTask.css";
import iconFile from "./icons/file.png";
import iconDownload from "./icons/download.png";
import ScrollableWrap from "../ScrollableWrap/ScrollableWrap";
import {endTask, removeTask, startTask} from "../../store/Reducers/taskReducer";
import IsAuth from "../../hooks/IsAuth";
import {ReactComponent as IconDeleteCrossSVG} from "./icons/delete-cross.svg";
import Comments from "../Comments/Comments";
import {removeSubtask} from "../../store/Reducers/subtaskReducer";
import {removeComment} from "../../store/Reducers/commentReducer";
import CreateAndShowSubtask from "../CreateAndShowSubtask/CreateAndShowSubtask";
import HoverButton from "../CreateTaskModal/components/HoverButton";



Modal.setAppElement("#root");

export default function InfoTask({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const subtasksStore = useSelector(state => state.subtasks);
  const [showFormSubtask, setShowFormSubtask] = useState(false);




  const handleDownloadClick = (fileData) => {
    if (fileData) {
      const a = document.createElement('a');
      a.href = fileData;
      a.download = 'decoded_file'; // Задаем имя файла для скачивания
      a.click();
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "80%",
      maxHeight: "90vh",
      overflowY: "auto",
    }
  };



  const ShowButtonWithStatus = (status, task_id) => {
    if (status === "queue") {
      return (
        <HoverButton
          onClick={() => {
            dispatch(startTask("development", new Date(), task_id, "🔆️"));
          }}
          IconButton={IconDeleteCrossSVG}
          titleButton={"Начать"}
          backgroundBeforeClick={"#27aa80"}
          backgroundAfterClick={"#70a138"}
        />
      )
    } else if (status === "development") {
      return (
        <HoverButton
          onClick={() => {
            dispatch(endTask("done", new Date(), task_id, "✅️"));
          }}
          IconButton={IconDeleteCrossSVG}
          titleButton={"Завершить"}
          backgroundBeforeClick={"#f35555"}
          backgroundAfterClick={"#70a138"}
        />
      )
    }
  }

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

          <div className={"container-buttons-info"}>
            {IsAuth() && currentUser.id === item.author ? (
              <>
                <HoverButton
                  onClick={() => {
                    item.subtasks.map((id) => {
                      dispatch(removeSubtask(id));
                    })

                    item.comments.map((id) => {
                      dispatch(removeComment(id));
                    })

                    dispatch(removeTask(item.id));
                  }}
                  IconButton={IconDeleteCrossSVG}
                  titleButton={"Удалить"}
                  backgroundBeforeClick={"#d00000"}
                  backgroundAfterClick={"#70a138"}
                />

                {item.status !== "done" && (
                  <HoverButton
                    onClick={() => {}}
                    IconButton={IconDeleteCrossSVG}
                    titleButton={"Редактировать"}
                    backgroundBeforeClick={"#2681c4"}
                    backgroundAfterClick={"#70a138"}
                  />
                )}
              </>
            ) : ("")}
            {IsAuth() && ShowButtonWithStatus(item.status, item.id)}
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
                    <div key={file.id || index} className={`container-file ${filesArrayLength !== currentIndex ? "space-between-elements" : ""}`}
                         onClick={() => {
                           handleDownloadClick(file.data)
                         }}>
                      <img className={"icon-file"} src={iconFile} alt={"icon file"}/>
                      <img className={"icon-file download-icon"} src={iconDownload} alt={"icon download file"}/>
                      {
                        file.fileName !== undefined && (
                          <p className={"no-select-text file-title"}>{file.fileName.length > 10 ? `${showShortNameFile(file.fileName, 8)}` : file.fileName}</p>
                        )
                      }
                      <p className={"no-select-text file-size"}>({formatFileSize(file.fileSize)})</p>
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

          <h3>{getSubtask(item.subtasks, subtasksStore).length === 0 && (<p>Подзадач не найденно!</p>)}</h3>

          {item.status !== "done" && (
            <CreateAndShowSubtask
              currentItem={item}
              subtasks={getSubtask(item.subtasks, subtasksStore)}
              location={"info"}
              showForm={showFormSubtask}
              setShowForm={(val) => setShowFormSubtask(val)}
              task_id={item.id}
              task_author={item.author}
            />
          )}
        </div>

        <div style={{
          marginTop: "40px"
        }}>
          <h3>Коментарии: </h3>

          <div style={{
            padding: "2px 2px 2px 2px"
          }}>
            <Comments task_id={item.id} />
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}>
          <p><b>Дата создания задачи: </b><i>{getCurrentDate(item.dateOfCreation, true)}</i></p>

          {item.startDate !== null && item.status !== "queue" && (
            <p><b>Дата начала задачи: </b><i>{getCurrentDate(item.startDate, true)}</i></p>
          )}

          {item.endDate !== null && item.status === "done" && (
            <p><b>Дата окончания задачи: </b><i>{getCurrentDate(item.endDate, true)}</i></p>
          )}

          {item.startDate !== null && item.endDate !== null && item.status === "done" && (
            <p><b>Время в работе: </b><i>{calculateTimeInWork(item.startDate, item.endDate)}</i></p>
          )}
        </div>
      </div>
    </Modal>
  )
}

