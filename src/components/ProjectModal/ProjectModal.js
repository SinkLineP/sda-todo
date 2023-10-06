import React from "react";
import Modal from "react-modal";
import {FormSubmit} from "../FormSubmit/FormSubmit";
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {addProject} from "../../store/Reducers/projectReducer";
import {v4 as uuid} from "uuid";
import styles from "./ProjectModal.module.css";


export default function ProjectModal({ onClose, show }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "60%",
      height: "18rem"
    }
  }

  const validationsSchema = yup.object().shape({
    projectName: yup.string()
      .min(2, "Название проекта должно быть минимум 2 символа")
      .max(25, "Название проекта должно быть максимум 25 символов")
      .required('Введите ваше название проекта'),
  })

  const dispatch = useDispatch();
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
        <h1 className={styles.title}>Создание проекта</h1>
        <Formik
          initialValues={{
            projectName: '',
          }}
          validateOnBlur
          onSubmit={(values, { resetForm }) => {
            dispatch(addProject({
              id: uuid(),
              title: values.projectName,
              status: "queue",
              user_id: currentUser.id,
              created_at: new Date(),
            }));

            resetForm();
          }}
          validationSchema={validationsSchema}>
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, resetForm }) => {
            return (
              <div className={'form'}>
                <div>
                  <label htmlFor="title" className={styles.label}>Введите название проекта: <ErrorMessage name={"projectName"} className={`errors ${styles.error}`} component={"span"} /></label>
                  <Field
                    className={styles.input_form_project_name}
                    type="text"
                    id="title"
                    name={"projectName"}
                    placeholder={"Введите название проекта..."}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                  />
                </div>

                <FormSubmit
                  title={"Создать проект"}
                  Submit={() => {
                    handleSubmit();
                    onClose();
                  }}
                  validate={!isValid || !dirty}
                />
              </div>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}