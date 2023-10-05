import React, {useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";
import FormSubtask from "./components/FormSubtask/FormSubtask";
import ShowSubtasks from "./components/ShowSubtask/ShowSubtasks";
import {getCurrentDate, iconWithStatus, onDropHandler, SliceSelectedFiles, uploadedFilesShow} from "./Functions";
import styles from "./CreateTaskModal.module.css";
import {initialValues} from "./InitialValues";
import {validationSchema} from "./Schema";
import ButtonShowOrHideSubtask from "./components/ButtonShowOrHideSubtask/ButtonShowOrHideSubtask";


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
      <div className={styles.container}>
        <h1 className={styles.title}>Создание задачи</h1>
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
                  <div className={styles.container_field}>
                    <label className={styles.label} htmlFor="title">Введите заголовок задачи: <ErrorMessage className={"errors"} name="title" component="span" /></label>

                    <Field
                      className={styles.input}
                      type="text"
                      id="title"
                      name="title"
                      placeholder={"Введите заголовок задачи..."}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    />
                  </div>

                  {/* numberTask */}
                  <div className={styles.container_field}>
                    <label className={styles.label} htmlFor="numberTask">Введите номер задачи: <ErrorMessage className={"errors"} name="numberTask" component="span" /></label>

                    <Field
                      className={styles.input}
                      type="text"
                      id="numberTask"
                      name="numberTask"
                      placeholder={"Введите номер задачи..."}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    />
                  </div>

                  {/* description */}
                  <div className={styles.container_field}>
                    <label className={styles.label} htmlFor="description">Введите описание задачи: <ErrorMessage className={"errors"} name="description" component="span" /></label>

                    <Field
                      className={styles.input}
                      type="text"
                      id="description"
                      name="description"
                      placeholder={"Введите описание задачи..."}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    />
                  </div>

                  {/* priority */}
                  <div className={styles.container_field}>
                    <label className={styles.label} htmlFor="priority">Выберите приоритет задачи: <ErrorMessage className={"errors"} name="priority" component="span" /></label>

                    <Field
                      className={styles.input}
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
                  <div className={styles.container_field}>
                    <label className={styles.label} htmlFor="status">Выберите статус задачи: <ErrorMessage className={"errors"} name="status" component="span" /></label>

                    <Field
                      className={styles.input}
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
                  <div className={styles.container_field}>
                    <div className={styles.container_subtask_header}>
                      <div>
                        <p className={styles.title_subtask}>Подзадачи: <ErrorMessage className={"errors"} name="status" component="span" /></p>
                      </div>
                      <div>
                        {
                          !showFormSubtask ? (
                            <ButtonShowOrHideSubtask title={"Добавить подзадачи"} func={() => setShowFormSubtask(true)} />
                          ) : (
                            <ButtonShowOrHideSubtask title={"Скрыть подзадачи"} func={() => setShowFormSubtask(false)} />
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
                        <p className={styles.title_subtask}>Список подзадач: </p>
                        <div className={styles.container_subtask_content}>
                          <ShowSubtasks data={subtasks} />
                        </div>
                      </>
                    )}
                  </div>

                  {/* file */}
                  <div
                    className={styles.container_drag_and_drop_upload_file}
                    onDrop={e => onDropHandler(e, setFieldValue, setErrorFile, setUploadedFiles)}
                  >
                    {errorFile !== "" ? <p className={"errors"}>{errorFile}</p> : <p className={"errors"}>&nbsp;</p>}
                    <div className={styles.drop_area}>
                      <p className={styles.title_drop_file}>Выберите или перетащите файл в это окно</p>
                      <div>
                        <label htmlFor="file" className={styles.button_select_file}>Выбрать файл</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          multiple
                          className={styles.hide_input_select_file}
                          onChange={(event) => {
                            const selectedFiles = Array.from(event.currentTarget.files);
                            const newSelectedFiles = selectedFiles.filter(item => item.size > 0);
                            setUploadedFiles(newSelectedFiles);
                            SliceSelectedFiles(newSelectedFiles, setFieldValue, event.currentTarget.value, setErrorFile);
                          }}
                        />
                      </div>
                      <p className={styles.list_uploaded_files}>
                        {uploadedFiles.length !== 0 ? uploadedFiles.map((files) => uploadedFilesShow(files, uploadedFiles)) : <p>Тут будут названия загруженных файлов</p>}
                      </p>
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