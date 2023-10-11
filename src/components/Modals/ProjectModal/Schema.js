import * as yup from "yup";

export const validationsSchema = yup.object().shape({
  projectName: yup.string()
    .min(2, "Название проекта должно быть минимум 2 символа")
    .max(25, "Название проекта должно быть максимум 25 символов")
    .required('Введите ваше название проекта'),
})