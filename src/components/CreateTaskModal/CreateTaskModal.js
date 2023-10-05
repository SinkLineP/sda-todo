import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import {convertTypeFileToObject, CountSliceFilesTask, getCurrentDate} from "../../Variables";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";
import * as yup from "yup";
import FormSubtask from "./components/FormSubtask";


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
      width: "80%",
      height: "82vh",
      maxHeight: "82vh",
      overflowY: "auto",
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


  useEffect(() => {
    console.log(subtasks);
  }, [subtasks]);



  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        setShowFormSubtask(false);
        onClose();
        setUploadedFiles([]);
        setSubtasks([]);
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
                      placeholder={"Введите заголовок задачи..."}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
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
                      placeholder={"Введите номер задачи..."}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
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
                      placeholder={"Введите описание задачи..."}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    />
                  </div>

                  {/* priority */}
                  <div className={"container-label-field"}>
                    <label htmlFor="priority">Выберите приоритет задачи: <ErrorMessage className={"errors"} name="priority" component="span" /></label>
                    <Field
                      className={"task-input select"}
                      as="select"
                      name="priority"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
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
                      className={"task-input"}
                      as="select"
                      name="status"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
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
                            <p className={`btn-subtask add-subtask`} onClick={() => setShowFormSubtask(true)}>Добавить подзадачи</p>
                          ) : (
                            <p className={`btn-subtask remove-subtask`} onClick={() => {
                              setShowFormSubtask(false)
                              // resetForm()
                            }}>Удалить подзадачи</p>
                          )
                        }

                      </div>
                    </div>

                    {showFormSubtask === true && (
                      <FormSubtask subtasks={subtasks} setSubtasks={(val) => {
                        setSubtasks((prevState) => ([
                          ...prevState,
                          val,
                        ]))
                      }} />
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
                    isValid={isValid}
                    values={values}
                    handleSubmit={handleSubmit}
                    closeSubtasks={() => setShowFormSubtask(false)}
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