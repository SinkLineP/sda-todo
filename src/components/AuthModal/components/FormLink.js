import React from "react";
import {changeForm} from "../../../store/Reducers/authReducer";
import {useDispatch} from "react-redux";


export const FormLink = ({ title, linkTitle, props, resetForm }) => {
  const dispatch = useDispatch();

  return (
    <p className={"change-form no-select-text"}>{title} - <span className={"link"} onClick={() => {
      dispatch(changeForm(props));
      resetForm();
    }}>{linkTitle}</span></p>
  )
}