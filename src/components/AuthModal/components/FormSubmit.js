import React from "react";


export const FormSubmit = ({ Submit, title, validate }) => {
  return (
    <button
      className={`btn ${validate ? ("btn-disabled") : ("btn-success")}`}
      disabled={validate}
      onClick={Submit}
          // handleSubmit()
          // onClose()
          // setShowPassword(false)
      type={'submit'}
    >{title}</button>
  )
}