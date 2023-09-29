import React from "react";
import Modal from "react-modal";
import { Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/Reducers/taskReducer";

export default function TaskModal({ show, onClose, project_id }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "80%",
      height: "30rem"
    }
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Введите заголовок"),
    file: yup.mixed().required("Выберите файл"),
    numberTask: yup
      .number()
      .typeError("Номер задачи должен быть числом")
      .required('Введите номер задачи')
      .test('is-number', 'Номер задачи должен быть числом', (value) => {
        if (!value) return true; // Allow empty value
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

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        onClose();
      }}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <div>
        <h1 style={{
          display: "block",
          textAlign: "center",
          marginBottom: "3rem"
        }}>Создание задачи</h1>

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
                <div>
                  <label htmlFor="title">Заголовок:</label>
                  <Field type="text" id="title" name="title" />
                  <ErrorMessage name="title" component="div" />
                </div>

                {/* file */}
                <div>
                  <label htmlFor="file">Выберите файлы:</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    multiple  // Add the multiple attribute
                    onChange={(event) => {
                      // event.currentTarget.files is now an array of selected files
                      const selectedFiles = Array.from(event.currentTarget.files);
                      setFieldValue("file", selectedFiles);
                    }}
                  />
                  <ErrorMessage name="file" component="div" />
                </div>

                {/* numberTask */}
                <div>
                  <label htmlFor="numberTask">Введите номер задачи:</label>
                  <Field type="text" id="numberTask" name="numberTask" />
                  <ErrorMessage name="numberTask" component="div" />
                </div>

                {/* description */}
                <div>
                  <label htmlFor="description">Введите описание задачи:</label>
                  <Field type="text" id="description" name="description" />
                  <ErrorMessage name="description" component="div" />
                </div>

                {/* priority */}
                <div>
                  <label htmlFor="priority">Выберите приоритет задачи:</label>
                  <Field as="select" name="priority">
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="height">Высокий</option>
                  </Field>
                  <ErrorMessage name="priority" component="div" />
                </div>

                {/* status */}
                <div>
                  <label htmlFor="status">Выберите статус задачи:</label>
                  <Field as="select" name="status">
                    <option value="queue">Queue</option>
                    <option value="development">Development</option>
                    <option value="done">Done</option>
                  </Field>
                  <ErrorMessage name="status" component="div" />
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