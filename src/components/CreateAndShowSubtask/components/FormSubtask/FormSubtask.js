import React from "react";
import styles from "./FormSubtask.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {v4 as uuid} from "uuid";
import {validationChildSchema} from "./Schema";
import {initialChildValues} from "./InitialValues";
import {useDispatch} from "react-redux";
import {addSubtask, addSubtaskToTask} from "../../../../store/Actions/Actions";


const FormSubtask = ({ author, setSubtasks, location, task_id, setShowForm }) => {
  const dispatch = useDispatch();


  return (
    <>
      <div className={`${styles.container} shadow-box`}>
        <div className={styles.container_title}>
          <h2 className={styles.title}>Создание подзадачи</h2>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={initialChildValues(author)}
          validationSchema={validationChildSchema}
          onSubmit={(values, { resetForm }) => {
            const { titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask } = values;
            const subtaskID = uuid();

            if (location === "form") {
              setSubtasks({
                id: subtaskID,
                titleSubtask: titleSubtask,
                numberSubtask: Number(numberSubtask),
                descriptionSubtask: descriptionSubtask,
                prioritySubtask: prioritySubtask,
                statusSubtask: statusSubtask,
                author: author,
              });
            } else {
              dispatch(addSubtask({
                id: subtaskID,
                titleSubtask: titleSubtask,
                numberSubtask: Number(numberSubtask),
                descriptionSubtask: descriptionSubtask,
                prioritySubtask: prioritySubtask,
                statusSubtask: statusSubtask,
                author: author,
              }))

              dispatch(addSubtaskToTask(subtaskID, task_id))


            }
            setShowForm(false);

            resetForm()
          }}
        >
          {() => (
            <Form>
              <div className={styles.container_field}>
                <label className={styles.label}>Заголовок подзадачи: <ErrorMessage name="titleSubtask" component="span" className="errors" /></label>
                <Field
                  name="titleSubtask"
                  className={styles.input}
                  placeholder={"Введите заголовок подзадачи..."}
                />
              </div>

              <div className={styles.container_field}>
                <label className={styles.label}>Номер подзадачи: <ErrorMessage name="numberSubtask" component="span" className="errors" /></label>
                <Field
                  name="numberSubtask"
                  className={styles.input}
                  placeholder={"Введите номер подзадачи..."}
                />
              </div>

              <div className={styles.container_field}>
                <label className={styles.label}>Описание подзадачи: <ErrorMessage name="descriptionSubtask" component="span" className="errors" /></label>
                <Field
                  name="descriptionSubtask"
                  className={styles.input}
                  placeholder={"Введите описание подзадачи..."}
                />
              </div>

              <div className={styles.container_field}>
                <label className={styles.label}>Приоритет подзадачи: </label>
                <Field
                  as="select"
                  name="prioritySubtask"
                  className={styles.input}
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="height">Высокий</option>
                </Field>
              </div>

              <button type="submit" className={styles.submit} >
                Сохранить подзадачу
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default FormSubtask;