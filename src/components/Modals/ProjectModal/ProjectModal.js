import React from "react";
import Modal from "react-modal";
import {FormSubmit} from "../../FormSubmit/FormSubmit";
import {ErrorMessage, Field, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid} from "uuid";
import styles from "./ProjectModal.module.css";
import {addProject} from "../../../store/Actions/Actions";
import {validationsSchema} from "./Schema";
import {initialValues} from "./initialValues";


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
          initialValues={initialValues}
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
          {({ handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
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