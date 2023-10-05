import React, {useState} from "react";
import Modal from "react-modal";
import {convertTypeObjectToFile, formatFileSize, getAuthorProject} from "../../Functions";
import {useDispatch, useSelector} from "react-redux";
import ColorizeWrapText from "../ColorizeWrapText/ColorizeWrapText";
import "./InfoTask.css";
import iconFile from "./icons/file.png";
import iconDownload from "./icons/download.png";
import ScrollableWrap from "../ScrollableWrap/ScrollableWrap";
import {removeTask} from "../../store/Reducers/taskReducer";
import IsAuth from "../../hooks/IsAuth";
import {ReactComponent as IconDeleteCrossSVG} from "./icons/delete-cross.svg";
import {ReactComponent as IconApplyDeleteSVG} from "./icons/apply-delete.svg";
import Comments from "../Comments/Comments";
import ShowSubtasks from "../CreateTaskModal/components/ShowSubtask/ShowSubtasks";
import {removeSubtask} from "../../store/Reducers/subtaskReducer";
import {removeComment} from "../../store/Reducers/commentReducer";


Modal.setAppElement("#root");

export default function InfoTask({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const subtasksStore = useSelector(state => state.subtasks);
  const commentsStore = useSelector(state => state.comments);

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
      maxHeight: "90vh",
      overflowY: "auto",
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const getSubtask = (data) => {
    return subtasksStore.filter(item => data.includes(item.id));
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

          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            {IsAuth() && currentUser.id === item.author ? (
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false)
                  setIsClicked(false)
                }}
                className={isClicked ? `btn-remove remove-task-clicked` : `btn-remove remove-task no-select-text ${isHovered ? "hovered" : ""}`}
                onClick={() => {
                  setIsClicked(true);
                  setTimeout(() => {
                    item.subtasks.map((id) => {
                      dispatch(removeSubtask(id));
                    })

                    item.comments.map((id) => {
                      dispatch(removeComment(id));
                    })

                    dispatch(removeTask(item.id));
                    setIsClicked(false);
                  }, 500);
                }}
              >
                <div className={`container-title-remove-task ${isHovered ? "slide-out-left-title" : ""}`}>
                  <span>Удалить</span>
                </div>
                {
                  isClicked ? (
                    <div className={`container-icon-remove-task ${isHovered ? "slide-out-left-icon" : ""}`}>
                      <IconApplyDeleteSVG className={"icon-apply-remove-task"} />
                    </div>
                  ) : (
                    <div className={`container-icon-remove-task ${isHovered ? "slide-out-left-icon" : ""}`}>
                      <IconDeleteCrossSVG className={"icon-remove-task"} />
                    </div>
                  )
                }
              </button>
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
                {convertTypeObjectToFile(item.files).map((file, index) => {
                  const filesArrayLength = item.files.length;
                  const currentIndex = index + 1;

                  return (
                    <div key={file.id || index} className={`container-file ${filesArrayLength !== currentIndex ? "space-between-elements" : ""}`}
                         onClick={() => {
                           handleDownloadClick(file)
                         }}>
                      <img className={"icon-file"} src={iconFile} alt={"icon file"}/>
                      <img className={"icon-file download-icon"} src={iconDownload} alt={"icon download file"}/>
                      {
                        file.name !== undefined && (
                          <p className={"no-select-text file-title"}>{file.name.length > 10 ? `${showShortNameFile(file.name, 8)}` : file.name}</p>
                        )
                      }
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

              <ShowSubtasks task_id={item.id} data={getSubtask(item.subtasks)} location={"info-task"} />
            </>
          ) : (
            <>
              <h3>Подзадач не найдено!</h3>
            </>
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

