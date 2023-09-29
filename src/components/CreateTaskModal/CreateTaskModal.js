import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import {CountSliceFilesTask} from "../../Variables";
import {mergedSchema, validationSchemaTasks} from "./Schemas";
import {combinedInitialValues, initialValuesTasks} from "./InitilalValues";


export default function CreateTaskModal({ show, onClose, project_id }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [errorFile, setErrorFile] = useState("");
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const dispatch = useDispatch();
  // const [showWarningSubtask, setShowWarningSubtask] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "60%",
    }
  };



  const iconWithStatus = (status) => {
    if (status.toLowerCase() === "queue") {
      return "⭕️";
    } else if (status.toLowerCase() === "development") {
      return "🔆️";
    } else if (status.toLowerCase() === "done") {
      return "✅";
    }
  }

  const getCurrentDate = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${day}\\${month}\\${year}`;
  }

  const dragStartHandler = (e) => {
    e.preventDefault();
    console.log("drag start handler");
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    console.log("drag leave handler");
  }

  const SliceSelectedFiles = (files, setFieldValue, clear) => {
    if (files.length <= CountSliceFilesTask) {
      setFieldValue("file", files);
    } else {
      setErrorFile(`Вы можете выбрать не более ${CountSliceFilesTask} файлов.`);
      setTimeout(() => setErrorFile(""), 1500);
      clear = null;
    }
  }

  const onDropHandler = (e, setFieldValue) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files]

    SliceSelectedFiles(files, setFieldValue, e.dataTransfer.files);
  };



  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        onClose();
      }}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <div className={"container-create-task"}>
        <h1 className={"title-create-task"}>Создание задачи</h1>
          <Formik
            initialValues={showFormSubtask === true ? combinedInitialValues : initialValuesTasks}
            validateOnBlur
            onSubmit={({ title, file, numberTask, description, priority, status, titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask  }) => {
              dispatch(addTask({
                projectId: Number(project_id),
                numberTask: Number(numberTask),
                title: title,
                description: description,
                dateOfCreation: getCurrentDate(),
                timeInWork: null,
                endDate: null,
                priority: priority,
                files: file,
                status: status,
                subtasks: [{
                  titleSubtask:titleSubtask,
                  numberSubtask:numberSubtask,
                  descriptionSubtask:descriptionSubtask,
                  prioritySubtask: prioritySubtask,
                  statusSubtask: statusSubtask
                }],
                comments: [],
                icon: iconWithStatus(status),
                author: Number(currentUser.id),
              }));
              onClose();
            }}
            validationSchema={showFormSubtask === true ? mergedSchema : validationSchemaTasks}
          >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {/* title */}
                  <div className={"container-label-field"}>
                    <label htmlFor="title">Введите заголовок задачи: <ErrorMessage className={"errors"} name="title" component="span" /></label>
                    <Field className={"task-input"} type="text" id="title" name="title" />
                  </div>

                  {/* numberTask */}
                  <div className={"container-label-field"}>
                    <label htmlFor="numberTask">Введите номер задачи: <ErrorMessage className={"errors"} name="numberTask" component="span" /></label>
                    <Field className={"task-input"} type="text" id="numberTask" name="numberTask" />
                  </div>

                  {/* description */}
                  <div className={"container-label-field"}>
                    <label htmlFor="description">Введите описание задачи: <ErrorMessage className={"errors"} name="description" component="span" /></label>
                    <Field className={"task-input"} type="text" id="description" name="description" />
                  </div>

                  {/* priority */}
                  <div className={"container-label-field"}>
                    <label htmlFor="priority">Выберите приоритет задачи: <ErrorMessage className={"errors"} name="priority" component="span" /></label>
                    <Field className={"task-select"} as="select" name="priority">
                      <option value="low">Низкий</option>
                      <option value="medium">Средний</option>
                      <option value="height">Высокий</option>
                    </Field>
                  </div>

                  {/* status */}
                  <div className={"container-label-field"}>
                    <label htmlFor="status">Выберите статус задачи: <ErrorMessage className={"errors"} name="status" component="span" /></label>
                    <Field className={"task-select"} as="select" name="status">
                      <option value="queue">Queue</option>
                      <option value="development">Development</option>
                      <option value="done">Done</option>
                    </Field>
                  </div>

                  {/* subtask */}
                  <div className={"container-label-field"}>
                    <div style={{
                      paddingBottom: "4rem"
                    }}>
                      <div style={{ float: "left" }}>
                        <p className={"title-subtask"}>Подзадачи: <ErrorMessage className={"errors"} name="status" component="span" /></p>
                      </div>
                      <div style={{ float: "right" }}>
                        <p className={`btn-subtask ${showFormSubtask ? "remove-subtask" : "add-subtask"}`} onClick={() => setShowFormSubtask(!showFormSubtask)}>{ showFormSubtask ? "Удалить подзадачи" : "Добавить подзадачи" }</p>
                      </div>
                    </div>

                    {/*{showWarningSubtask ? (*/}
                    {/*  <div className={"warning no-select-text"}>*/}
                    {/*    <div>*/}
                    {/*      <p className={"hide no-select-text"} onClick={() => setShowWarningSubtask(false)}>Скрыть подсказку</p>*/}
                    {/*    </div>*/}

                    {/*    <div>*/}
                    {/*      <p>Заголовок подзадачи - от 5 до 24 символов</p>*/}
                    {/*      <p>Номер подзадачи - только числа</p>*/}
                    {/*      <p>Описание подзадачи - от 10 до 2000 символов</p>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*) : ("")}*/}

                    {showFormSubtask === true ? (
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
                        <tr>
                          <td>
                            <Field className={"subtask-input"} type="text" id={"titleSubtask"} name={"titleSubtask"} />
                          </td>
                          <td>
                            <Field className={"subtask-input"} type="text" id={"numberSubtask"} name={"numberSubtask"} />
                          </td>
                          <td>
                            <Field className={"subtask-input"} type="text" id={"descriptionSubtask"} name={"descriptionSubtask"} />
                          </td>
                          <td>
                            <Field className={"subtask-select"} as="select" name="prioritySubtask">
                              <option value="lows">Низкий</option>
                              <option value="mediums">Средний</option>
                              <option value="heights">Высокий</option>
                            </Field>
                          </td>
                          <td>
                            <Field className={"subtask-select"} as="select" name="statusSubtask">
                              <option value="queues">Queue</option>
                              <option value="developments">Development</option>
                              <option value="dones">Done</option>
                            </Field>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}

                  </div>

                  {/* file */}
                  <div
                    className={"container-drag-and-drop-upload-file"}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e, setFieldValue)}
                  >
                    {errorFile !== "" ? <p className={"errors"}>{errorFile}</p> : <p className={"errors"}>&nbsp;</p>}
                    <div className={"drop-area"}>
                      <p className={"title-drop-file"}>Выберите или перетащите файл в это окно</p>

                      <div>
                        <label htmlFor="file" className="custom-file-input">Выбрать файл</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          multiple
                          style={{ display: "none" }}
                          onChange={(event) => {
                            const selectedFiles = Array.from(event.currentTarget.files);

                            SliceSelectedFiles(selectedFiles, setFieldValue, event.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className={`btn ${!isValid || !dirty ? ("btn-disabled") : ("btn-success")}`}
                    disabled={!isValid || !dirty}
                    type="submit"
                  >Создать задачу</button>
                </form>
              );
            }}
          </Formik>
      </div>
    </Modal>
  );
}