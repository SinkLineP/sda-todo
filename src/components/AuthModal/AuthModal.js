import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Formik} from "formik";
import * as yup from 'yup';
import "./AuthModal.css";

export default function AuthModal({ show, onClose }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "350px",
      height: "25rem"
    }
  }

  const validationsSchema = yup.object().shape({
    username: yup.string()
      .min(3, "Имя пользователя должно быть минимум 3 символа")
      .max(20, "Имя пользователя должно быть максимум 20 символов")
      .required('Enter your username!'),
    password: yup.string()
      .required("This field is required")
      .min(8, "Пароль должен быть минимум 8 символов")
      .matches(/\d/, "Пароль должен содержать хотя бы одну цифру"),
  })

  const [isShowPassword, setShowPassword] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

  useEffect(() => {
    if (isShowPassword) {
      setTypePassword("string")
    } else {
      setTypePassword("password")
    }
  }, [isShowPassword, setTypePassword])

  return (
    <Modal isOpen={show} onRequestClose={() => {
      setShowPassword(false)
      onClose()
    }} overlayClassName={"overlay"} style={customStyles}>
      <p className={"title-form"}>Регистрация</p>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={validationsSchema}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
          return (
            <div className={'form'}>
              {/* username */}
              <p>
                <label className={"label"} htmlFor={'username'}>Имя пользователя: </label><br></br>
                {touched.username && errors.username ? (<p className="errors">{errors.username}</p>) : (<p className="errors">&nbsp;</p>)}

                <div style={{
                  display: "flex"
                }}>
                  <input
                    className={"input-form input-form-username"}
                    type={'text'}
                    name={'username'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
              </p>

              {/* password */}
              <p>
                <label className={"label"} htmlFor={'password'}>Пароль: </label><br></br>
                {touched.password && errors.password ? (<p className="errors">{errors.password}</p>) : (<p className="errors">&nbsp;</p>)}

                <div className={"content-password"}>
                  <input
                    className={"input-form input-form-password"}
                    type={typePassword}
                    name={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <button
                    className={"input-form input-form-show-password"}
                    onClick={() => setShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>

              </p>

              <button
                className="btn btn-success"
                disabled={!isValid && !dirty}
                onClick={() => {
                  if (
                    JSON.stringify(errors) === "{}" &&
                    values.username !== "" &&
                    values.password !== ""
                  ) {
                    handleSubmit()
                    onClose()
                    setShowPassword(false)
                  }
                }}
                type={'submit'}
              >Зарегистрироваться</button>
            </div>
          )

        }}
      </Formik>
    </Modal>
  )
}