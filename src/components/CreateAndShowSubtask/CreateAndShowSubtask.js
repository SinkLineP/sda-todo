import React from "react";
import styles from "./CreateAndShowSubtask.module.css";
import {ErrorMessage} from "formik";
import ButtonShowOrHideSubtask from "./components/ButtonShowOrHideSubtask/ButtonShowOrHideSubtask";
import FormSubtask from "./components/FormSubtask/FormSubtask";
import ShowSubtasks from "./components/ShowSubtask/ShowSubtasks";
import {useSelector} from "react-redux";
import IsAuth from "../../hooks/IsAuth";


const CreateAndShowSubtask = ({ subtasks, setSubtasks, location, showForm, setShowForm, task_id, task_author, currentItem }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuth = IsAuth();

  const IsShowCreateSubtask = ({showForm, setShowForm}) => {
    if (!showForm) {
      return <ButtonShowOrHideSubtask title={"Добавить подзадачи"} func={() => setShowForm(true)} />;
    } else {
      return <ButtonShowOrHideSubtask title={"Скрыть форму"} func={() => setShowForm(false)} />;
    }
  }

  const CheckModify = ({ location, setShowForm, showForm, isAuth }) => {
    if (isAuth) {
      if (location === "info") {
        if (task_author === currentUser.id) {
            return <IsShowCreateSubtask setShowForm={setShowForm} showForm={showForm} />
        }
      } else if (location === "form") {
        return <IsShowCreateSubtask setShowForm={setShowForm} showForm={showForm} />
      }
    }
  }


  return (
    <div className={styles.container_field}>
      <div>
        <div>
          {location === "form" && (<p className={styles.title_subtask}>Подзадачи: <ErrorMessage className={"errors"} name="status" component="span" /></p>)}
        </div>
        <CheckModify setShowForm={setShowForm} location={location} isAuth={isAuth} showForm={showForm} />
      </div>

      {showForm === true && (
        <div className={styles.container_form}>
          <FormSubtask setShowForm={setShowForm} task_id={task_id} location={location} author={currentUser.id} setSubtasks={(val) => {
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

          <div className={styles.container_show}>
            {subtasks.map((item) => {
              return (
                <ShowSubtasks currentItem={currentItem} item={item} task_id={task_id} data={subtasks} setData={(val) => setSubtasks(val)} location={location} />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}


export default CreateAndShowSubtask;