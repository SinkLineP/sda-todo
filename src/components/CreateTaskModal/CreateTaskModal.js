import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import {CountSliceFilesTask} from "../../Variables";
import {mergedSchema} from "./Schemas";
import {combinedInitialValues} from "./InitilalValues";


export default function CreateTaskModal({ show, onClose, project_id }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [errorFile, setErrorFile] = useState("");
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const dispatch = useDispatch();

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

  const ButtonSubmit = ({isValid, values, handleSubmit}) => {
    return (
      <button
        className={`btn ${!isValid === false
          ? (showFormSubtask === true
            ? (customSubtasksValidate(values.titleSubtask, values.numberSubtask, values.descriptionSubtask, values.prioritySubtask, values.statusSubtask).length !== 0
              ? 'btn-success'
              : 'btn-disabled')
            : (values.title && values.numberTask && values.description && values.priority && values.status
              ? 'btn-success'
              : 'btn-disabled'))
          : 'btn-disabled'}`}
        type={"submit"}
        onClick={() => {
          if (!isValid === false) {
            if (showFormSubtask === true) {
              if (customSubtasksValidate(values.titleSubtask, values.numberSubtask, values.descriptionSubtask, values.prioritySubtask, values.statusSubtask).length !== 0) {
                handleSubmit()
                onClose()
                setShowFormSubtask(false)
              }
            } else {
              if (values.title && values.numberTask && values.description && values.priority && values.status) {
                handleSubmit()
                onClose()
              }
            }
          }
        }}
      >
        Создать задачу
      </button>
    )
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        setShowFormSubtask(false);
        onClose();
      }}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <div className={"container-create-task"}>
        <h1 className={"title-create-task"}>Создание задачи</h1>
          <Formik
            initialValues={combinedInitialValues}
            validateOnMount
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
                subtasks: customSubtasksValidate(titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask),
                comments: [],
                icon: iconWithStatus(status),
                author: Number(currentUser.id),
              }));
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

                            SliceSelectedFiles(selectedFiles, setFieldValue, event.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>


                  <ButtonSubmit isValid={isValid} values={values} handleSubmit={handleSubmit} />
                </>
              );
            }}
          </Formik>
      </div>
    </Modal>
  );
}