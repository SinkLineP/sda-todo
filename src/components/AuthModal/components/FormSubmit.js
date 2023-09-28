import React from "react";


export const FormSubmit = ({ handleSubmit, onClose, setShowPassword, title, validate }) => {
  return (
    <button
      className={`btn ${validate ? ("btn-disabled") : ("btn-success")}`}
      disabled={validate}
      onClick={() => {
        handleSubmit()
        onClose()
        setShowPassword(false)
      }}
      type={'submit'}
    >{title}</button>
  )
}