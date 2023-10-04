import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import {convertTypeFileToObject, CountSliceFilesTask, getCurrentDate} from "../../Variables";
import {mergedSchema} from "./Schemas";
import {combinedInitialValues} from "./InitilalValues";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";


export default function CreateTaskModal({ show, onClose, project_id }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [errorFile, setErrorFile] = useState("");
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
      setFieldValue("file", convertTypeFileToObject(files));
    } else {
      setErrorFile(`Вы можете выбрать не более ${CountSliceFilesTask} файлов.`);
      setTimeout(() => setErrorFile(""), 1500);
      clear = null;
    }
  }

  const onDropHandler = (e, setFieldValue) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files]

    setUploadedFiles(files);

    SliceSelectedFiles(files, setFieldValue, e.dataTransfer.files);
  };

  const customSubtasksValidate = (titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask) => {
    if (titleSubtask && numberSubtask && descriptionSubtask && prioritySubtask && statusSubtask) {
      const obj = {
        titleSubtask:titleSubtask,
        numberSubtask:numberSubtask,
        descriptionSubtask:descriptionSubtask,
        prioritySubtask: prioritySubtask,
        statusSubtask: statusSubtask
      };

      const array = [];
      array.push(obj);
      return array;
    } else {
      return [];
    }
  }



  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        setShowFormSubtask(false);
        onClose();
        setUploadedFiles([]);
      }}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <div className={"container-create-task"}>
        <h1 className={"title-create-task"}>Создание задачи</h1>
          <Formik
            initialValues={{
              title: "",
              file: null,
              numberTask: '',
              description: '',
              priority: 'low',
              status: 'queue',
              titleSubtask: "",
              numberSubtask: '',
              descriptionSubtask: '',
              prioritySubtask: 'low',
              statusSubtask: 'queue',
            }}
            validateOnMount
            validateOnBlur
            onSubmit={({ title, file, numberTask, description, priority, status, titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask  }) => {
              dispatch(addTask({
                id: uuid(),
                projectId: project_id,
                numberTask: Number(numberTask),
                title: title,
                description: description,
                dateOfCreation: getCurrentDate(),
                timeInWork: null,
                endDate: null,
                priority: priority,
                files: file,
                status: status,
                subtasks: customSubtasksValidate(titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask),
                icon: iconWithStatus(status),
                author: currentUser.id,
              }));

              setUploadedFiles([]);
            }}
            validationSchema={mergedSchema}
          >
            {({ values,validateForm, resetForm, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue }) => {
              return (
                <>
                  {/* title */}
                  <div className={"container-label-field"}>
                    <label htmlFor="title">Введите заголовок задачи: <ErrorMessage className={"errors"} name="title" component="span" /></label>
                    <Field
                      className={"task-input"}
                      type="text"
                      id="title"
                      name="title"
                      onChange={(e) => {
                        handleChange(e);
                        validateForm();  // Включите валидацию после изменения значения
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        validateForm();  // Включите валидацию после потери фокуса
                      }}
                    />
                  </div>

                  {/* numberTask */}
                  <div className={"container-label-field"}>
                    <label htmlFor="numberTask">Введите номер задачи: <ErrorMessage className={"errors"} name="numberTask" component="span" /></label>
                    <Field
                      className={"task-input"}
                      type="text"
                      id="numberTask"
                      name="numberTask"
                      onChange={(e) => {
                        handleChange(e);
                        validateForm();  // Включите валидацию после изменения значения
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        validateForm();  // Включите валидацию после потери фокуса
                      }}
                    />
                  </div>

                  {/* description */}
                  <div className={"container-label-field"}>
                    <label htmlFor="description">Введите описание задачи: <ErrorMessage className={"errors"} name="description" component="span" /></label>
                    <Field
                      className={"task-input"}
                      type="text"
                      id="description"
                      name="description"
                      onChange={(e) => {
                        handleChange(e);
                        validateForm();  // Включите валидацию после изменения значения
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        validateForm();  // Включите валидацию после потери фокуса
                      }}
                    />
                  </div>

                  {/* priority */}
                  <div className={"container-label-field"}>
                    <label htmlFor="priority">Выберите приоритет задачи: <ErrorMessage className={"errors"} name="priority" component="span" /></label>
                    <Field
                      className={"task-select"}
                      as="select"
                      name="priority"
                      onChange={(e) => {
                        handleChange(e);
                        validateForm();  // Включите валидацию после изменения значения
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        validateForm();  // Включите валидацию после потери фокуса
                      }}
                    >
                      <option value="low">Низкий</option>
                      <option value="medium">Средний</option>
                      <option value="height">Высокий</option>
                    </Field>
                  </div>

                  {/* status */}
                  <div className={"container-label-field"}>
                    <label htmlFor="status">Выберите статус задачи: <ErrorMessage className={"errors"} name="status" component="span" /></label>
                    <Field
                      className={"task-select"}
                      as="select"
                      name="status"
                      onChange={(e) => {
                        handleChange(e);
                        validateForm();  // Включите валидацию после изменения значения
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        validateForm();  // Включите валидацию после потери фокуса
                      }}
                    >
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
                        {
                          !showFormSubtask ? (
                            <p className={`btn-subtask add-subtask`} onClick={() => setShowFormSubtask(!showFormSubtask)}>Добавить подзадачи</p>
                          ) : (
                            <p className={`btn-subtask remove-subtask`} onClick={() => {
                              setShowFormSubtask(!showFormSubtask)
                              resetForm()
                            }}>Удалить подзадачи</p>
                          )
                        }

                      </div>
                    </div>

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
                            <Field
                              className={"subtask-input"}
                              type="text"
                              id={"titleSubtask"}
                              name={"titleSubtask"}
                              onChange={(e) => {
                                handleChange(e);
                                validateForm();  // Включите валидацию после изменения значения
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                validateForm();  // Включите валидацию после потери фокуса
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              className={"subtask-input"}
                              type="text"
                              id={"numberSubtask"}
                              name={"numberSubtask"}
                              onChange={(e) => {
                                handleChange(e);
                                validateForm();  // Включите валидацию после изменения значения
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                validateForm();  // Включите валидацию после потери фокуса
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              className={"subtask-input"}
                              type="text"
                              id={"descriptionSubtask"}
                              name={"descriptionSubtask"}
                              onChange={(e) => {
                                handleChange(e);
                                validateForm();  // Включите валидацию после изменения значения
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                validateForm();  // Включите валидацию после потери фокуса
                              }}
                            />
                          </td>
                          <td>
                            <Field
                              className={"subtask-select"}
                              as="select"
                              name="prioritySubtask"
                              onChange={(e) => {
                                handleChange(e);
                                validateForm();  // Включите валидацию после изменения значения
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                validateForm();  // Включите валидацию после потери фокуса
                              }}
                            >
                              <option value="lows">Низкий</option>
                              <option value="mediums">Средний</option>
                              <option value="heights">Высокий</option>
                            </Field>
                          </td>
                          <td>
                            <Field
                              className={"subtask-select"}
                              as="select"
                              name="statusSubtask"
                              onChange={(e) => {
                                handleChange(e);
                                validateForm();  // Включите валидацию после изменения значения
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                validateForm();  // Включите валидацию после потери фокуса
                              }}
                            >
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

                            const newSelectedFiles = selectedFiles.filter(item => item.size > 0);

                            setUploadedFiles(newSelectedFiles);

                            SliceSelectedFiles(newSelectedFiles, setFieldValue, event.currentTarget.value);
                          }}
                        />
                      </div>

                      <p style={{
                        padding: "0.5rem"
                      }}>{uploadedFiles.length !== 0 ? uploadedFiles.map((files) => {
                        if (uploadedFiles.length === 1) {
                          return `${files.name}`
                        }
                        return `${files.name} / `
                      }) : ("Тут будет названия загруженных файлов")}</p>
                    </div>
                  </div>


                  <ButtonSubmit
                    onClose={onClose}
                    customSubtasksValidate={customSubtasksValidate}
                    setShowFormSubtask={setShowFormSubtask}
                    showFormSubtask={showFormSubtask}
                    isValid={isValid}
                    values={values}
                    handleSubmit={handleSubmit}
                    clearUploadedFiles={setUploadedFiles}
                  />
                </>
              );
            }}
          </Formik>
      </div>
    </Modal>
  );
}