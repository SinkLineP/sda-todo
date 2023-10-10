import React from "react";
import {useDispatch} from "react-redux";
import {changeForm} from "../../../../store/Actions/Actions";


export const FormLink = ({ title, linkTitle, props, resetForm, clearErrorMessages }) => {
  const dispatch = useDispatch();

  return (
    <p className={"change-form no-select-text"}>{title} - <span className={"link"} onClick={() => {
      dispatch(changeForm(props));
      resetForm();
      clearErrorMessages();
    }}>{linkTitle}</span></p>
  )
}