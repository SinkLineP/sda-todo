import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import {convertTypeFileToObject, CountSliceFilesTask, getCurrentDate} from "../../Variables";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";
import * as yup from "yup";


export default function CreateTaskModal({ show, onClose, project_id }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [errorFile, setErrorFile] = useState("");
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
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

  const ShowSubtasks = ({ data }) => {
    return (
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
          data.map((subtask, index) => {
            return (
              <tr key={index}>
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
    )
  }

  const FormSubtask = () => {
    const [titleSubtask, setTitleSubtask] = useState("");

    return (
      <>
        <div>
          <div>
            <h2>Создание подзадачи</h2>
          </div>

          <div>
            <label>Заголовок подзадачи</label>
            <input
              name={"titleSubtask"}
              className={""}
              style={{}}
              placeholder={"Введите заголовок подзадачи..."}
              onChange={(e) => {console.log(e)}}
              onBlur={(e) => {console.log(e)}}
            />

            <label>Номер подзадачи</label>
            <input
              name={"titleSubtask"}
              className={""}
              style={{}}
              placeholder={"Введите заголовок подзадачи..."}
              onChange={(e) => {console.log(e)}}
              onBlur={(e) => {console.log(e)}}
            />

            <label>Описание подзадачи</label>
            <input
              name={"titleSubtask"}
              className={""}
              style={{}}
              placeholder={"Введите заголовок подзадачи..."}
              onChange={(e) => {console.log(e)}}
              onBlur={(e) => {console.log(e)}}
            />

            <label>Приоритет подзадачи</label>
            <select>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="height">Высокий</option>
            </select>
            {/*<input*/}
            {/*  name={"titleSubtask"}*/}
            {/*  className={""}*/}
            {/*  style={{}}*/}
            {/*  placeholder={"Введите заголовок подзадачи..."}*/}
            {/*  onChange={(e) => {console.log(e)}}*/}
            {/*  onBlur={(e) => {console.log(e)}}*/}
            {/*/>*/}

            <label>Статус подзадачи</label>
            <select>
              <option value="queue">Queue</option>
              <option value="development">Development</option>
              <option value="done">Done</option>
            </select>
            {/*<input*/}
            {/*  name={"titleSubtask"}*/}
            {/*  className={""}*/}
            {/*  style={{}}*/}
            {/*  placeholder={"Введите заголовок подзадачи..."}*/}
            {/*  onChange={(e) => {console.log(e)}}*/}
            {/*  onBlur={(e) => {console.log(e)}}*/}
            {/*/>*/}
          </div>

          <button>Сохранить под задачу</button>
        </div>

        <div>
          {subtasks.length !== 0 && <ShowSubtasks data={subtasks} />}
        </div>
      </>
    )
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
                // subtasks: customSubtasksValidate(titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask),
                icon: iconWithStatus(status),
                author: currentUser.id,
              }));

              setUploadedFiles([]);
            }}
            validationSchema={yup.object().shape({
              title: yup.string()
                .min(5, "Заголовок должен быть больше 5 символов!")
                .max(100, "Заголовок должен быть меньше 100 символов!")
                .required("Введите заголовок"),
              numberTask: yup
                .number()
                .typeError("Номер задачи должен быть числом")
                .required('Введите номер задачи')
                .test('is-number', 'Номер задачи должен быть числом', (value) => {
                  if (!value) return true;
                  return !isNaN(value);
                }),
              description: yup.string()
                .min(10, "Описание задачи должно быть больше 10 символов")
                .max(2000, "Описание задачи должно быть меньше 2000 символов")
                .required("Введите описание задачи"),
              priority: yup.string().required('Выберите приоритет задачи'),
              status: yup.string().required('Выберите статус задачи'),
              // titleSubtask: yup
              //   .string()
              //   .min(5, "Заголовок должен быть больше 5 символов!")
              //   .max(100, "Заголовок должен быть меньше 100 символов!")
              //   .when("showFormSubtask", {
              //     is: true,
              //     then: yup.string().required("Введите заголовок подзадачи"),
              //     otherwise: yup.string(),
              //   }),
              // numberSubtask: yup
              //   .number()
              //   .typeError("Должно быть число")
              //   .test('is-number', 'Номер подзадачи должен быть числом', (value) => {
              //     if (!value) return true;
              //     return !isNaN(value);
              //   }),
                // .when("showFormSubtask", {
                //   is: true,
                //   then: yup.string().required("Введите заголовок подзадачи"),
                //   otherwise: yup.string(),
                // }),
              // descriptionSubtask: yup.string()
              //   .min(10, "Описание подзадачи должно быть больше 10 символов")
              //   .max(2000, "Описание подзадачи должно быть меньше 2000 символов"),
                // .when("showFormSubtask", {
                //   is: true,
                //   then: yup.string().required("Введите заголовок подзадачи"),
                //   otherwise: yup.string(),
                // }),
              // prioritySubtask: yup.string(),
              // statusSubtask: yup.string(),
            })}
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

                    {showFormSubtask === true && (
                      <FormSubtask />
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