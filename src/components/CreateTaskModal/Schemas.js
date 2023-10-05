import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string()
    .min(5, "Заголовок должен быть больше 5 символов!")
    .max(100, "Заголовок должен быть меньше 100 символов!")
    .required("Введите заголовок"),
  numberTask: yup
    .number()
    .typeError("Номер задачи должен быть числом")
    .required('Введите номер задачи')
    .test('is-number', 'Номер задачи должен быть числом', (value) => {
      if (!value) return true;
      return !isNaN(value);
    })
    .min(1, "Номер должен быть больше 1 символа!")
    .max(99999999, "Номер должен быть меньше 8 символов!"),
  description: yup.string()
    .min(10, "Описание задачи должно быть больше 10 символов")
    .max(2000, "Описание задачи должно быть меньше 2000 символов")
    .required("Введите описание задачи"),
  priority: yup.string().required('Выберите приоритет задачи'),
  status: yup.string().required('Выберите статус задачи'),
})