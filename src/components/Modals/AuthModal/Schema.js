import * as yup from "yup";

export const validationsSchema = yup.object().shape({
  username: yup.string()
    .min(3, "Имя пользователя должно быть минимум 3 символа")
    .max(20, "Имя пользователя должно быть максимум 20 символов")
    .required('Enter your username!'),
  password: yup.string()
    .required("This field is required")
    .min(8, "Пароль должен быть минимум 8 символов")
    .matches(/\d/, "Пароль должен содержать хотя бы одну цифру"),
})