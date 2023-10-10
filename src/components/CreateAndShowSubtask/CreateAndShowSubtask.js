import React, {useEffect} from "react";
import styles from "./CreateAndShowSubtask.module.css";
import ButtonShowOrHideSubtask from "./components/ButtonShowOrHideSubtask/ButtonShowOrHideSubtask";
import FormSubtask from "./components/FormSubtask/FormSubtask";
import ShowSubtasks from "./components/ShowSubtask/ShowSubtasks";
import {useSelector} from "react-redux";
import IsAuth from "../../hooks/IsAuth";


const CreateAndShowSubtask = ({ subtasks, setSubtasks, location, showForm, setShowForm, task_id, task_author, currentItem, isEditing }) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuth = IsAuth();

  const IsShowCreateSubtask = ({showForm, setShowForm}) => {
      return <ButtonShowOrHideSubtask title={!showForm ? "Добавить подзадачи" : "Скрыть форму"} func={() => setShowForm(!showForm)} />;
  }

  const CheckModify = ({ location, setShowForm, showForm, isAuth }) => {
    if (isAuth) {
      if (location === "info") {
        if (!isEditing) {
          if (task_author === currentUser.id && currentItem.status === "queue") {
            return <IsShowCreateSubtask setShowForm={setShowForm} showForm={showForm} />
          }
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
          {!isEditing && <p className={styles.title_subtask}>Подзадачи: </p>}
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

      {subtasks.length !== 0 && !isEditing && (
        <>
          <div className={styles.container_show}>
            {subtasks.map((item, index) => {
              return (
                <ShowSubtasks
                  key={index}
                  currentItem={currentItem}
                  item={item}
                  task_id={task_id}
                  data={subtasks}
                  setData={(val) => setSubtasks(val)}
                  location={location}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}


export default CreateAndShowSubtask;