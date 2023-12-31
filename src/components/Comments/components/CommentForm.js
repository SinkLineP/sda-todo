import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuid } from 'uuid';
import {addComment, addCommentToTask} from "../../../store/Actions/Actions";
import {AiOutlineSend} from "react-icons/ai";



const validationSchema = Yup.object().shape({
  value: Yup.string()
    .required('Введите комментарий...')
    .max(600, 'Комментарий не может превышать 600 символов'),
});

const CommentForm = ({ task_id }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const commentID = uuid();
      dispatch(addCommentToTask(commentID, task_id));

      dispatch(addComment({
        id: commentID,
        task_id: task_id,
        user_id: currentUser.id,
        content: values.value,
        date: new Date(),
        parent_id: null,
        comments: [],
      }))
      resetForm();
    },
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formik.handleSubmit();
      e.target.blur();
    }
  };


  return (
    <form className={"container-comment-form"} onSubmit={formik.handleSubmit}>
      {formik.touched.value && formik.errors.value ? (
        <div className="errors">{formik.errors.value}</div>
      ) : null}

      <div className={"comment-form"}>
        <input
          className={"input-create-comment"}
          type={"search"}
          placeholder={"Введите комментарий..."}
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onKeyPress={handleKeyPress}
        />

        <button
          className={"button-on-comment button-reply"}
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          <span><AiOutlineSend/></span>
        </button>
      </div>
    </form>
  );
};

export default CommentForm;