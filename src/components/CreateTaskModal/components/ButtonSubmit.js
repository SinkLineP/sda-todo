import React from "react";


const ButtonSubmit = ({ isValid, handleSubmit, clearUploadedFiles, values, onClose, closeSubtasks, isShowFormSubtasks }) => {
  return (
    <button
      className={`btn ${!isValid === false ? 'btn-success' : 'btn-disabled'} `}
      type={"submit"}
      onClick={() => {
        if (!isValid === false) {
          if (values.title && values.numberTask && values.description && values.priority && values.status) {
            handleSubmit()
            onClose()
            clearUploadedFiles([])
            closeSubtasks()
          }
        }
      }}
    >
      Создать задачу
    </button>
  )
}

export default ButtonSubmit;