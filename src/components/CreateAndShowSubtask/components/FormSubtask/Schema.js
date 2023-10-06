import * as yup from "yup";

export const validationChildSchema = yup.object().shape({
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
    .required("Поле не должно быть пустым!")
    .min(1, "Номер должен быть больше 1 символа!")
    .max(99999999, "Номер должен быть меньше 8 символов!"),
  descriptionSubtask: yup.string()
    .min(10, "Описание подзадачи должно быть больше 10 символов")
    .max(2000, "Описание подзадачи должно быть меньше 2000 символов")
    .required("Поле не должно быть пустым!")
    .test('max-length', 'Описание подзадачи должно быть меньше 2000 символов', (value) => {
      return !value || value.length <= 2000;
    }),
  prioritySubtask: yup.string(),
  statusSubtask: yup.string(),
});
