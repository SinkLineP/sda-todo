import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Formik} from "formik";
import * as yup from 'yup';
import "./AuthModal.css";
import {useDispatch, useSelector} from "react-redux";
import {createUser, setCurrentUser} from "../../store/Reducers/authReducer";
import {FormLink} from "./components/FormLink";
import {FormSubmit} from "./components/FormSubmit";
import IsCreatedUser from "../../hooks/IsCreatedUser";

export default function AuthModal({ show, onClose }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: "350px",
      height: "30rem"
    }
  }



  const [isShowPassword, setShowPassword] = useState(false);
  const [typePassword, setTypePassword] = useState("password");

  const dispatch = useDispatch();
  const currentForm = useSelector(state => state.auth.currentForm);
  const usersStore = useSelector(state => state.auth.users);

  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (isShowPassword) {
      setTypePassword("string")
    } else {
      setTypePassword("password")
    }
  }, [isShowPassword, setTypePassword]);

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => {
        setShowPassword(false);
        setErrorMessage("");
        onClose();
      }}
      overlayClassName={"overlay"}
      style={customStyles}
    >
      <p className={"title-form"}>{currentForm === "login" ? ("Авторизация") : ("Регистрация")}</p>
      {errorMessage !== "" ? (<p className={"errors"}>{errorMessage}</p>) : (<p className={"errors"}>&nbsp;</p>)}

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          if (currentForm === "login") {
            const user = usersStore.find((user) => user.username === values.username && user.password === values.password);

            dispatch(setCurrentUser(user.id, user.username, user.password)); //karamalesa13
          } else if (currentForm === "signup") {
            console.log("Handle submit - SignUp - create user dispatch");
            dispatch(createUser(values.username, values.password));
          }
        }}
        validationSchema={validationsSchema}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, resetForm }) => {
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

              <FormSubmit
                title={currentForm === "login"  ? ("Войти") : ("Зарегистрироваться")}
                Submit={() => {
                  if (usersStore.some((user) => {
                    return user.username === values.username
                  })) {
                    if (currentForm === "signup") {
                      setErrorMessage("Пользователь с таким именем уже существует!");
                      console.log("Current Form - SignUp");
                    } else {
                      console.log("Current Form - Login");

                      handleSubmit();
                      setShowPassword(false);
                      setErrorMessage("");
                      onClose();
                    }
                  } else {
                    if (currentForm === "signup") {
                      console.log("Current Form - SignUp");

                      handleSubmit();
                      setShowPassword(false);
                      setErrorMessage("");
                      onClose();
                    } else {
                      setErrorMessage("Такого пользователя не существует!");
                      console.log("Current Form - Login");
                    }
                  }
                }}
                validate={!isValid || !dirty}
                values={values}
                currentForm={currentForm}
              />

              <FormLink
                title={currentForm === "login"  ? ("Нету аккаунта?") : ("Есть аккаунт?")}
                linkTitle={currentForm === "login"  ? ("Зарегистрируйтесь") : ("Войдите")}
                props={currentForm === "login"  ? ("signup") : ("login")}
                resetForm={resetForm}
                setErrorMessage={setErrorMessage}
              />
            </div>
          )

        }}
      </Formik>
    </Modal>
  )
}