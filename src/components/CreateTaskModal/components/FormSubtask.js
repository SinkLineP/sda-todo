import React, {useState} from "react";
import ShowSubtasks from "./ShowSubtasks";
import "./FormSubtask.css";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {v4 as uuid} from "uuid";


const FormSubtask = ({ subtasks, setSubtasks }) => {
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
      .required("Поле не должно быть пустым!"),
    describeSubtask: yup.string()
      .min(10, "Описание подзадачи должно быть больше 10 символов")
      .max(2000, "Описание подзадачи должно быть меньше 2000 символов")
      .required("Поле не должно быть пустым!"),
    prioritySubtask: yup.string(),
    statusSubtask: yup.string(),
  });

  const initialChildValues = {
    titleSubtask: "",
    numberSubtask: "",
    describeSubtask: "",
    prioritySubtask: "low",
    statusSubtask: "queue",
  };



  return (
    <>
      <div className={"container-subtask-form"}>
        <div className={"container-subtask-title"}>
          <h2 className={"subtask-title"}>Создание подзадачи</h2>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={initialChildValues}
          validationSchema={validationChildSchema}
          onSubmit={(values, { resetForm }) => {
            const { titleSubtask, numberSubtask, describeSubtask, prioritySubtask, statusSubtask } = values;

            setSubtasks({
              id: uuid(),
              titleSubtask: titleSubtask,
              numberSubtask: Number(numberSubtask),
              describeSubtask: describeSubtask,
              prioritySubtask: prioritySubtask,
              statusSubtask: statusSubtask
            });

            resetForm()
          }}
        >
          {() => (
            <Form>
              <div className={"container-subtask-field"}>
                <label className={"subtask-label"}>Заголовок подзадачи: <ErrorMessage name="titleSubtask" component="span" className="errors" /></label>
                <Field
                  name="titleSubtask"
                  className={"subtask-input"}
                  placeholder={"Введите заголовок подзадачи..."}
                />
              </div>

              <div className={"container-subtask-field"}>
                <label className={"subtask-label"}>Номер подзадачи: <ErrorMessage name="numberSubtask" component="span" className="errors" /></label>
                <Field
                  name="numberSubtask"
                  className={"subtask-input"}
                  placeholder={"Введите номер подзадачи..."}
                />
              </div>

              <div className={"container-subtask-field"}>
                <label className={"subtask-label"}>Описание подзадачи: <ErrorMessage name="describeSubtask" component="span" className="errors" /></label>
                <Field
                  name="describeSubtask"
                  className={"subtask-input"}
                  placeholder={"Введите описание подзадачи..."}
                />
              </div>

              <div className={"container-subtask-field"}>
                <label className={"subtask-label"}>Приоритет подзадачи: </label>
                <Field
                  as="select"
                  name="prioritySubtask"
                  className={"subtask-input"}
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="height">Высокий</option>
                </Field>
              </div>

              <div className={"container-subtask-field"}>
                <label className={"subtask-label"}>Статус подзадачи: </label>
                <Field
                  as="select"
                  name="statusSubtask"
                  className={"subtask-input"}
                >
                  <option value="queue">Queue</option>
                  <option value="development">Development</option>
                  <option value="done">Done</option>
                </Field>
              </div>

              <button type="submit" className={`btn-subtask-submit`} >
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