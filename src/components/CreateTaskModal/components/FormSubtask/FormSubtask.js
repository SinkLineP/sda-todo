import React, {useState} from "react";
import ShowSubtasks from "../ShowSubtask/ShowSubtasks";
import styles from "./FormSubtask.module.css";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {v4 as uuid} from "uuid";


const FormSubtask = ({ author, setSubtasks }) => {
  const validationChildSchema = yup.object().shape({
    titleSubtask: yup
      .string()
      .min(5, "Заголовок должен быть больше 5 символов!")
      .max(100, "Заголовок должен быть меньше 100 символов!")
      .required("Поле не должно быть пустым!"),
    numberSubtask: yup
      .number()
      .typeError("Номер подзадачи должен быть числом")
      .test('is-number', 'Номер подзадачи должен быть числом', (value) => {
        if (!value) return true;
        return !isNaN(value);
      })
      .required("Поле не должно быть пустым!")
      .min(1, "Номер должен быть больше 1 символа!")
      .max(99999999, "Номер должен быть меньше 8 символов!"),
    descriptionSubtask: yup.string()
      .min(10, "Описание подзадачи должно быть больше 10 символов")
      .max(2000, "Описание подзадачи должно быть меньше 2000 символов")
      .required("Поле не должно быть пустым!")
      .test('max-length', 'Описание подзадачи должно быть меньше 2000 символов', (value) => {
        return !value || value.length <= 2000;
      }),
    prioritySubtask: yup.string(),
    statusSubtask: yup.string(),
  });

  const initialChildValues = {
    titleSubtask: "",
    numberSubtask: "",
    descriptionSubtask: "",
    prioritySubtask: "low",
    statusSubtask: "queue",
    author: author
  };



  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_title}>
          <h2 className={styles.title}>Создание подзадачи</h2>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={initialChildValues}
          validationSchema={validationChildSchema}
          onSubmit={(values, { resetForm }) => {
            const { titleSubtask, numberSubtask, descriptionSubtask, prioritySubtask, statusSubtask } = values;

            setSubtasks({
              id: uuid(),
              titleSubtask: titleSubtask,
              numberSubtask: Number(numberSubtask),
              descriptionSubtask: descriptionSubtask,
              prioritySubtask: prioritySubtask,
              statusSubtask: statusSubtask,
              author: author,
            });

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

              <div className={styles.container_field}>
                <label className={styles.label}>Статус подзадачи: </label>
                <Field
                  as="select"
                  name="statusSubtask"
                  className={styles.input}
                >
                  <option value="queue">Queue</option>
                  <option value="development">Development</option>
                  <option value="done">Done</option>
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