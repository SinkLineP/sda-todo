import * as yup from "yup";

export const mergedSchema = yup.object().shape({
  title: yup.string()
    .min(5, "Заголовок должен быть больше 5 символов!")
    .max(24, "Заголовок должен быть меньше 24 символов!")
    .required("Введите заголовок"),
  numberTask: yup
    .number()
    .typeError("Номер задачи должен быть числом")
    .required('Введите номер задачи')
    .test('is-number', 'Номер задачи должен быть числом', (value) => {
      if (!value) return true;
      return !isNaN(value);
    }),
  description: yup.string()
    .min(10, "Описание задачи должно быть больше 10 символов")
    .max(2000, "Описание задачи должно быть меньше 2000 символов")
    .required("Введите описание задачи"),
  priority: yup.string().required('Выберите приоритет задачи'),
  status: yup.string().required('Выберите статус задачи'),
  // titleSubtask: yup.string()
  //   .min(5, "Заголовок должен быть больше 5 символов!")
  //   .max(24, "Заголовок должен быть меньше 24 символов!")
  //   .required("Введите заголовок"),
  // numberSubtask: yup
  //   .number()
  //   .typeError("Должно быть число")
  //   .required('Введите номер задачи')
  //   .test('is-number', 'Номер подзадачи должен быть числом', (value) => {
  //     if (!value) return true;
  //     return !isNaN(value);
  //   }),
  // descriptionSubtask: yup.string().required("*"),
  // prioritySubtask: yup.string().required("*"),
  // statusSubtask: yup.string().required("*"),
});