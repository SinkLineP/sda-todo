import React, {useState} from "react";
import Modal from "react-modal";
import {ErrorMessage, Field, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import ButtonSubmit from "./components/ButtonSubmit";
import {v4 as uuid} from "uuid";
import {iconWithStatus,} from "./Functions";
import styles from "./CreateTaskModal.module.css";
import {initialValues} from "./InitialValues";
import {validationSchema} from "./Schema";
import {addSubtask} from "../../store/Reducers/subtaskReducer";
import CreateAndShowSubtask from "../CreateAndShowSubtask/CreateAndShowSubtask";
import {formatFileSize, maxSizeFileUpload, showShortNameFile} from "../../Functions";

export default function CreateTaskModal({ show, onClose, project_id }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [errorFile, setErrorFile] = useState("");
  const [showFormSubtask, setShowFormSubtask] = useState(false);
  const dispatch = useDispatch();
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
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = async (e, setFieldValue) => {
    e.preventDefault();

    setErrorFile("");

    const ArrayTargetFiles = Array.from(e.target.files);

    ArrayTargetFiles.map((f) => {
      const filesLowZero = ArrayTargetFiles.filter(file => file.size <= 0);
      const filesMaxSize = ArrayTargetFiles.filter(file => file.size > maxSizeFileUpload);

      if (filesLowZero.length > 1 && f.size <= 0) {
        setErrorFile(`Файл с именем: ${f.name}, и еще (${filesLowZero.length - 1}) имеют не допустимый размер! `);
        setTimeout(() => setErrorFile(""), 5000);
      } else if (f.size <= 0) {
        setErrorFile(`Файл с именем: ${f.name} имеет не допустимый размер`);
        setTimeout(() => setErrorFile(""), 5000);
      }

      if (filesMaxSize.length > 1 && f.size > maxSizeFileUpload) {
        setErrorFile(`Файл ${f.name}, и еще (${filesMaxSize.length - 1}) слишком велеки!`);
        setTimeout(() => setErrorFile(""), 5000);
      } else if (f.size > maxSizeFileUpload) {
        setErrorFile(`Файл ${f.name} слишком велик!`);
        setTimeout(() => setErrorFile(""), 5000);
      }
    })

    const filteredFilesSize = Array.from(e.target.files).filter(f => f.size > 0 && f.size <= maxSizeFileUpload);
    const base64Array = [];

    filteredFilesSize.map(async (file) => {
        const base64 = await convertBase64(file);
        const fileID = uuid();

        base64Array.push({
          id: fileID,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          data: base64,
        })
    })

    setFieldValue("file", base64Array);
    setSelectedFiles(filteredFilesSize);
  };

  const PreviewFiles = () => {
    const SelectedFilesChild = () => {
      return selectedFiles.map((f, index) => {
          return (
            <div className={"shadow-box"} style={{
              borderWidth: "1px",
              borderColor: "lightgray",
              borderStyle: "solid",
              borderRadius: "1rem",
              padding: "0 1rem",
              width: "auto"
            }} key={index}>
              <p style={{color: "red", fontWeight: "bold", fontSize: "1.5rem", textAlign: "right", cursor: "pointer"}} className={"no-select-text"} onClick={() => {
                console.log(f);
              }}>X</p>
              <p style={{ whiteSpace: "nowrap" }}>Name: {showShortNameFile(f.name, 8)}</p>
              <p style={{ whiteSpace: "nowrap" }}>Size: {formatFileSize(f.size)}</p>
              <p style={{ whiteSpace: "nowrap" }}>Date: {f.lastModifiedDate.toLocaleDateString()}</p>
            </div>
          )

      })
    }

    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        overflowX: "scroll",
        gap: "10px",
        paddingBottom: "5px",
      }}>
        <SelectedFilesChild />
      </div>
    )
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <Modal
      isOpen={show}
        onRequestClose={() => {
          setShowFormSubtask(false);
          onClose();
          setSelectedFiles([]);
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


              const subtaskIDs = subtasks.map((item) => {
                dispatch(addSubtask(item));
                return item.id;
              })


              dispatch(addTask({
                id: uuid(),
                projectId: project_id,
                numberTask: Number(numberTask),
                title: title,
                description: description,
                dateOfCreation: new Date(),
                timeInWork: null,
                endDate: null,
                priority: priority,
                subtasks: subtaskIDs,
                comments: [],
                files: file,
                status: status,
                icon: iconWithStatus(status),
                author: currentUser.id,
                startDate: null
              }));



              setSelectedFiles([]);
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

                  {/* subtask */}
                  <CreateAndShowSubtask
                    subtasks={subtasks}
                    setSubtasks={(val) => setSubtasks(val)}
                    location={"form"}
                    showForm={showFormSubtask}
                    setShowForm={(val) => setShowFormSubtask(val)}
                  />

                  {/* file */}
                  <div
                    className={styles.container_drag_and_drop_upload_file}
                    onDrop={e => handleFileChange(e, setFieldValue)}
                    style={{ boxSizing: "border-box" }}
                  >
                    {errorFile !== "" ? <p className={"errors"}>{errorFile}</p> : <p className={"errors"}>&nbsp;</p>}
                    <div className={styles.drop_area}>
                      <p className={styles.title_drop_file}>Выберите или перетащите файл в это окно</p>

                      <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px"
                      }}>
                        <div>
                          <label htmlFor="file" className={styles.button_select_file}>Выбрать файлы</label>
                          <input
                            type="file"
                            id={"file"}
                            name={"file"}
                            multiple
                            className={styles.hide_input_select_file}
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                          />
                        </div>

                        {selectedFiles.length !== 0 && (
                          <div className={styles.button_clear_files} onClick={() => setSelectedFiles([])}>
                            <p>Очистить файлы</p>
                          </div>
                        )}
                      </div>

                      {selectedFiles.length !== 0 ? (
                        <div className={styles.list_uploaded_files} style={{ boxSizing: "border-box", width: "100%" }}>
                          <PreviewFiles />
                        </div>
                      ) : <p>(максимальный размер файла не больше <b>{formatFileSize(maxSizeFileUpload)}</b>)</p>}

                    </div>
                  </div>

                  <ButtonSubmit
                    onClose={onClose}
                    isValid={isValid}
                    values={values}
                    handleSubmit={handleSubmit}
                    closeSubtasks={() => setShowFormSubtask(false)}
                    clearUploadedFiles={setSelectedFiles}
                  />
                </>
              );
            }}
          </Formik>
      </div>
    </Modal>
  );
}