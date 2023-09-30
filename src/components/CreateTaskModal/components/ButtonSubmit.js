import React from "react";


const ButtonSubmit = ({isValid, values, handleSubmit, showFormSubtask, customSubtasksValidate, onClose, setShowFormSubtask, clearUploadedFiles}) => {
  return (
    <button
      className={`btn ${!isValid === false
        ? (showFormSubtask === true
          ? (customSubtasksValidate(values.titleSubtask, values.numberSubtask, values.descriptionSubtask, values.prioritySubtask, values.statusSubtask).length !== 0
            ? 'btn-success'
            : 'btn-disabled')
          : (values.title && values.numberTask && values.description && values.priority && values.status
            ? 'btn-success'
            : 'btn-disabled'))
        : 'btn-disabled'}`}
      type={"submit"}
      onClick={() => {
        if (!isValid === false) {
          if (showFormSubtask === true) {
            if (customSubtasksValidate(values.titleSubtask, values.numberSubtask, values.descriptionSubtask, values.prioritySubtask, values.statusSubtask).length !== 0) {
              handleSubmit()
              onClose()
              setShowFormSubtask(false)
              clearUploadedFiles([])
            }
          } else {
            if (values.title && values.numberTask && values.description && values.priority && values.status) {
              handleSubmit()
              onClose()
              clearUploadedFiles([])
            }
          }
        }
      }}
    >
      Создать задачу
    </button>
  )
}

export default ButtonSubmit;