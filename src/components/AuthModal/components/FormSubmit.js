import React from "react";


export const FormSubmit = ({ Submit, title, validate }) => {
  return (
    <button
      className={`btn ${validate ? ("btn-disabled") : ("btn-success")}`}
      disabled={validate}
      onClick={Submit}
      type={'submit'}
    >{title}</button>
  )
}