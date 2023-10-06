import React, {useState} from "react";
import styles from "./CreateAndShowSubtask.module.css";
import {ErrorMessage} from "formik";
import ButtonShowOrHideSubtask from "./components/ButtonShowOrHideSubtask/ButtonShowOrHideSubtask";
import FormSubtask from "./components/FormSubtask/FormSubtask";
import ShowSubtasks from "./components/ShowSubtask/ShowSubtasks";
import {useSelector} from "react-redux";


const CreateAndShowSubtask = ({ subtasks, setSubtasks, location, showForm, setShowForm, task_id }) => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <div className={styles.container_field}>
      <div className={styles.container_subtask_header}>
        <div>
          {location === "form" && (<p className={styles.title_subtask}>Подзадачи: <ErrorMessage className={"errors"} name="status" component="span" /></p>)}
        </div>
        <div>
          {
            !showForm ? (
              <ButtonShowOrHideSubtask title={"Добавить подзадачи"} func={() => setShowForm(true)} />
            ) : (
              <ButtonShowOrHideSubtask title={"Скрыть форму"} func={() => setShowForm(false)} />
            )
          }
        </div>
      </div>

      {showForm === true && (
        <div className={styles.container_show}>
          <FormSubtask setShowForm={setShowForm} task_id={task_id} location={location} author={currentUser.id} setSubtasks={(val) => {
            console.log(location === "form")
            if (location === "form") {
              setSubtasks((prevState) => ([
                ...prevState,
                val,
              ]))
            }
          }} />
        </div>
      )}

      {subtasks.length !== 0 && (
        <>
          <p className={styles.title_subtask}>Список подзадач: </p>
          <ShowSubtasks task_id={task_id} data={subtasks} setData={(val) => setSubtasks(val)} location={location} />
        </>
      )}
    </div>
  )
}


export default CreateAndShowSubtask;