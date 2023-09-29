import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Field, Formik, ErrorMessage, useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";
import "./CreateTaskModal.css";
import DragAndDropUploadFile from "../DragAndDropUploadFile/DragAndDropUploadFile";
import {CountSliceFilesTask} from "../../Variables";


export default function CreateTaskModal({ show, onClose, project_id }) {
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

  const validationSchema = yup.object().shape({
    title: yup.string()
      .min(5, "Заголовок должен быть больше 5 символов!")
      .max(24, "Заголовок должен быть меньше 24 символов!")
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
  });

  const dispatch = useDispatch();
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

  const currentUser = useSelector(state => state.auth.currentUser);
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
    console.log("drag start handler");
  }

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
    console.log("drag leave handler");
  }

  const [errorFile, setErrorFile] = useState("");

  const SliceSelectedFiles = (files, setValue, clear) => {
    if (files.length <= CountSliceFilesTask) {
      setValue("file", files);
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

    setDrag(false);
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
            initialValues={{
              title: "",
              file: null,
              numberTask: '',
              description: '',
              priority: 'low',
              status: 'queue',
            }}
            validateOnBlur
            onSubmit={({ title, file, numberTask, description, priority, status  }) => {
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
                subtasks: [],
                comments: [],
                icon: iconWithStatus(status),
                author: Number(currentUser.id),
              }));
              onClose();
            }}
            validationSchema={validationSchema}
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

                        <Field
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