import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {
  calculateTimeInWork, checkIsDoneSubtask, EditView,
  formatFileSize,
  getAuthorProject,
  getCurrentDate, getSubtask, priorities, setRangeValuePriority, showShortNameFile
} from "../../../Functions";
import {useDispatch, useSelector} from "react-redux";
import ColorizeWrapText from "../../ColorizeWrapText/ColorizeWrapText";
import styles from "./InfoTaskModal.module.css";
import iconFile from "./icons/file.png";
import iconDownload from "./icons/download.png";
import ScrollableWrap from "../../ScrollableWrap/ScrollableWrap";
import IsAuth from "../../../hooks/IsAuth";
import {ReactComponent as IconDeleteCrossSVG} from "./icons/delete-cross.svg";
import Comments from "../../Comments/Comments";
import CreateAndShowSubtask from "../../CreateAndShowSubtask/CreateAndShowSubtask";
import HoverButton from "../CreateTaskModal/components/HoverButton";
import RangePriority from "../../RangeComponents/RangePriority/RangePriority";
import {
  editPriorityTask,
  editTask,
  removeComment,
  removeSubtask,
  removeTask,
  startTask
} from "../../../store/Actions/Actions";




Modal.setAppElement("#root");

export default function InfoTaskModal({ show, onClose, item }) {
  const usersStore = useSelector(state => state.auth.users);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const subtasksStore = useSelector(state => state.subtasks);
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const [isDone, setIsDone] = useState(null);
  const taskData = useSelector(state => state.tasks);
  const [isEditing, setIsEditing] = useState(false);
  // ========== edit values ==============
  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.description);
  const [rangePriority, setRangePriority] = useState({
    id: null,
    value: setRangeValuePriority(item.priority).value,
  });


  useEffect(() => {
    if (isDone !== null) {
      if (isDone === false) setTimeout(() => setIsDone(null), 3000);
    }
  }, [isDone])

  const handleDownloadClick = (fileData) => {
    if (fileData) {
      const a = document.createElement('a');
      a.href = fileData;
      a.download = 'decoded_file'; // Задаем имя файла для скачивания
      a.click();
    }
  };

  const handleEditTask = () => {
    setIsEditing(true);
  }

  const handleSaveEditTask = () => {
    setIsEditing(false);

    if (rangePriority.id !== null) {
      dispatch(editPriorityTask(rangePriority.id, rangePriority.value))
    }

    dispatch(editTask(item.id, {
      ...item,
      title: title,
      description: desc,
      priority: priorities[rangePriority.value],
      subtasks: item.subtasks,
      files: item.files,
      status: item.status,
    }));
  }

  const handleCancelEditTask = () => {
    setIsEditing(false);
    setTitle(item.title);
    setRangePriority({
      id: null,
      value: setRangeValuePriority(item.priority).value,
    })
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxHeight: "90vh",
      overflowY: "auto",
    }
  };

  const ShowButtonWithStatus = (status, task_id) => {
    if (status === "queue" && !isEditing) {
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
            checkIsDoneSubtask(item, taskData, subtasksStore, (val) => setIsDone(val), dispatch)
          }}
          IconButton={IconDeleteCrossSVG}
          titleButton={"Завершить"}
          backgroundBeforeClick={"#f35555"}
          backgroundAfterClick={"#70a138"}
        />
      )
    }
  }

  const checkIsNotEmptyValue = (value) => {
    return value.length !== 0 && value[0] !== " ";
  }

  const ButtonIsEditing = () => {
    if (isEditing) {
      return (
        <>
          <HoverButton
            onClick={checkIsNotEmptyValue(title) && checkIsNotEmptyValue(desc) ? handleSaveEditTask : () => {}}
            IconButton={IconDeleteCrossSVG}
            titleButton={"Сохранить"}
            backgroundBeforeClick={checkIsNotEmptyValue(title) && checkIsNotEmptyValue(desc) ? "#99c07f" : "#cccccc"}
            backgroundAfterClick={checkIsNotEmptyValue(title) && checkIsNotEmptyValue(desc) ? "#70a138" : "#a1a1a1"}
          />

          <HoverButton
            onClick={handleCancelEditTask}
            IconButton={IconDeleteCrossSVG}
            titleButton={"Отменить"}
            backgroundBeforeClick={"#f36464"}
            backgroundAfterClick={"#70a138"}
          />
        </>
      )
    } else {
      return (
        <HoverButton
          onClick={handleEditTask}
          IconButton={IconDeleteCrossSVG}
          titleButton={"Редактировать"}
          backgroundBeforeClick={"#2681c4"}
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
      <div className={styles.container_info_task}>
        <div className={"close-btn-ctn"}>
          <div className={styles.container_title}>
            <ColorizeWrapText
              setEditValue={(val) => setTitle(val)}
              isEditing={isEditing}
              text={item.status}
              label={item.title}
              numberTask={item.numberTask}
              type={"title"}
              value={title}
              setValue={(val) => setTitle(val)}
            />
            <p>Автор: {getAuthorProject(item.author, usersStore)}</p>
          </div>

          <div className={styles.container_buttons_info}>
            {IsAuth() && currentUser.id === item.author ? (
              <>
                {!isEditing && (
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
                )}

                {item.status === "queue" && <ButtonIsEditing />}
              </>
            ) : ("")}
            {IsAuth() && ShowButtonWithStatus(item.status, item.id)}
          </div>
        </div>
        <div>
          <div className={styles.task_description}>
            <h3>Описание задачи:</h3>
            {isEditing ? (
              <EditView
                handleChange={(val) => setDesc(val)}
                value={desc}
                tag="p"
                style={{
                  borderRadius: "0.3rem",
                  minWidth: "100px",
                  marginLeft: "2px"
                }}
              />
            ) : (<p>{item.description}</p>)}
          </div>


          {isEditing ? (
            <>
              <ColorizeWrapText text={priorities[rangePriority.value]} label={"Приоритет задачи: "} type={"text"} />
              <RangePriority item={item} disabled={null} rangePriority={rangePriority} setRangePriority={(val) => setRangePriority(val)} />
            </>
          ) : (
            <ColorizeWrapText text={item.priority} label={"Приоритет задачи: "} type={"text"} />
          )}

          {item.files !== null && !isEditing ? (
            <>
              <h3>Вложеные файлы: ({item.files.length})</h3>
              <ScrollableWrap>
                {item.files.map((file, index) => {
                  const filesArrayLength = item.files.length;
                  const currentIndex = index + 1;

                  return (
                    <div key={file.id || index} className={`${styles.container_file} ${filesArrayLength !== currentIndex ? styles.space_between_elements : ""}`}
                       onClick={() => {
                         handleDownloadClick(file.data)
                       }}>
                      <img className={styles.icon_file} src={iconFile} alt={"icon file"}/>
                      <img className={`${styles.icon_file} ${styles.download_icon}`} src={iconDownload} alt={"icon download file"}/>
                      {
                        file.fileName !== undefined && (
                          <p className={`no-select-text ${styles.file_title}`}>{file.fileName.length > 10 ? `${showShortNameFile(file.fileName, 8)}` : file.fileName}</p>
                        )
                      }
                      <p className={`no-select-text ${styles.file_size}`}>({formatFileSize(file.fileSize)})</p>
                    </div>
                  )
                })}
              </ScrollableWrap>
            </>
          ) : !isEditing && (
            <>
              <h3>Вложеных файлов не найдено!</h3>
            </>
          )}

          <h3>{getSubtask(item.subtasks, subtasksStore).length === 0 && (<p>Подзадач не найденно!</p>)}</h3>

          {isDone !== null && isDone === false && (
            <div>
              <p className={styles.warning}>У вас остались еще не выполненые подзадачи!</p>
            </div>
          )}

          <CreateAndShowSubtask
            isEditing={isEditing}
            currentItem={item}
            subtasks={getSubtask(item.subtasks, subtasksStore)}
            location={"info"}
            showForm={showFormSubtask}
            setShowForm={(val) => setShowFormSubtask(val)}
            task_id={item.id}
            task_author={item.author}
          />
        </div>

        {!isEditing && (
          <div className={styles.container_comments}>
            <h3>Коментарии: </h3>

            <div className={styles.content_comments}>
              <Comments task_id={item.id} />
            </div>
          </div>
        )}

        <div className={styles.container_data}>
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

