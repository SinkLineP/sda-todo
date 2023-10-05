import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";
import * as yup from "yup";
import FormSubtask from "./components/FormSubtask";
import ShowSubtasks from "./components/ShowSubtasks";
import {getCurrentDate, iconWithStatus, onDropHandler, SliceSelectedFiles, uploadedFilesShow} from "./Functions";
import styles from "./CreateTaskModal.module.css";
import {initialValues} from "./InitialValues";
import {validationSchema} from "./Schemas";


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
      maxHeight: "82vh",
      overflowY: "auto",
    }
  };


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
            initialValues={initialValues}
            validateOnMount
            validateOnBlur
            onSubmit={({ title, file, numberTask, description, priority, status}, { resetForm }) => {
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
                subtasks: subtasks,
                files: file,
                status: status,
                icon: iconWithStatus(status),
                author: currentUser.id,
              }));

              setUploadedFiles([]);
              setSubtasks([]);
              resetForm();
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleBlur, isValid, handleSubmit, setFieldValue }) => {
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
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
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
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
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
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    />
                  </div>

                  {/* priority */}
                  <div className={"container-label-field"}>
                    <label htmlFor="priority">Выберите приоритет задачи: <ErrorMessage className={"errors"} name="priority" component="span" /></label>
                    <Field
                      className={"task-input select"}
                      as="select"
                      name="priority"
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
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
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    >
                      <option value="queue">Queue</option>
                      <option value="development">Development</option>
                      <option value="done">Done</option>
                    </Field>
                  </div>

                  {/* subtask */}
                  <div className={"container-label-field"}>
                    <div>
                      <div className={"container-subtask-header"}>
                        <div>
                          <p className={"title-subtask"}>Подзадачи: <ErrorMessage className={"errors"} name="status" component="span" /></p>
                        </div>
                        <div>
                          {
                            !showFormSubtask ? (
                              <p className={`btn-subtask add-subtask`} onClick={() => setShowFormSubtask(true)}>Добавить подзадачи</p>
                            ) : (
                              <p className={`btn-subtask add-subtask`} onClick={() => setShowFormSubtask(false)}>Скрыть подзадачи</p>
                            )
                          }
                        </div>
                      </div>

                      {showFormSubtask === true && (
                        <FormSubtask author={currentUser.id} setSubtasks={(val) => {
                          setSubtasks((prevState) => ([
                            ...prevState,
                            val,
                          ]))
                        }} />
                      )}

                      {subtasks.length !== 0 && (
                        <>
                          <p className={"title-subtask"}>Список подзадач: </p>
                          <div className={"container-subtask-content"}>
                            <ShowSubtasks data={subtasks} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* file */}
                  <div
                    className={"container-drag-and-drop-upload-file"}
                    onDrop={e => onDropHandler(e, setFieldValue, setErrorFile, setUploadedFiles)}
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
                            SliceSelectedFiles(newSelectedFiles, setFieldValue, event.currentTarget.value, setErrorFile);
                          }}
                        />
                      </div>

                      <p className={styles.list_uploaded_files}>{uploadedFiles.length !== 0 ? uploadedFiles.map((files) => uploadedFilesShow(files, uploadedFiles)) : ("Тут будут названия загруженных файлов")}</p>
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