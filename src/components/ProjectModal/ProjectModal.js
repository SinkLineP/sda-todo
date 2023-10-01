import React from "react";
import Modal from "react-modal";
import {FormSubmit} from "../FormSubmit/FormSubmit";
import {Formik} from "formik";
import * as yup from "yup";
import "./ProjectModal.css";
import {useDispatch, useSelector} from "react-redux";
import {addProject} from "../../store/Reducers/projectReducer";
import {v4 as uuid} from "uuid";


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
        <h1 style={{
          display: "block",
          textAlign: "center",
          marginBottom: "3rem"
        }}>Создание проекта</h1>

        <Formik
          initialValues={{
            projectName: '',
          }}
          validateOnBlur
          onSubmit={(values) => {
            dispatch(addProject({
              id: uuid(),
              title: values.projectName,
              status: "queue",
              user_id: currentUser.id
            }));
          }}
          validationSchema={validationsSchema}>
          {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, resetForm }) => {
            return (
              <div className={'form'}>
                {/* projectName */}
                <p>
                  <label className={"label"} htmlFor={'projectName'}>Введите название проекта: </label><br></br>
                  {touched.projectName && errors.projectName ? (<p className="errors">{errors.projectName}</p>) : (<p className="errors">&nbsp;</p>)}

                  <div style={{
                    display: "flex"
                  }}>
                    <input
                      className={"input-form input-form-project-name"}
                      type={'text'}
                      name={'projectName'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.projectName}
                    />
                  </div>
                </p>

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