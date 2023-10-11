import React, {useEffect, useState} from "react";
import Item from "../components/Item/Item";
import DropWrapper from "../components/DropWrapper/DropWrapper";
import Col from "../components/Col/Col";
import {useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import IsAuth from "../hooks/IsAuth";
import CreateTaskModal from "../components/Modals/CreateTaskModal/CreateTaskModal";
import {checkProjectsAuthor, getSubtask} from "../Functions";
import styles from "./styles/Tasks.module.css";


export default function Tasks() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [isDone, setIsDone] = useState(null);
  const statuses = useSelector(state => state.categories);
  const currentUser = useSelector(state => state.auth.currentUser);
  const projectsStore = useSelector(state => state.projects);
  const taskData = useSelector(state => state.tasks);
  const subtasksStore = useSelector(state => state.subtasks);
  const { project_id } = useParams();


  useEffect(() => {
    setItems(taskData);
  }, [setItems, taskData])

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find(si => si.status === status);

    // Проверка выполненных подзадач
    if (status === "done" && item.status !== "done") {
      const subtasks = getSubtask(taskData.find(i => i.id === item.id).subtasks, subtasksStore);
      const allSubtasksDone = subtasks.every(obj => obj.statusSubtask === "done");


      if (!allSubtasksDone) {
        setIsDone(allSubtasksDone);
        return;
      } else {
        setIsDone(allSubtasksDone);
      }
    }

    setItems(prevState => {
      const newItems = prevState
        .filter(i => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });

      return [...newItems];
    });
  };


  useEffect(() => {
    if (isDone !== null) {
      if (isDone === false) setTimeout(() => setIsDone(null), 3000);
    }
  }, [isDone])

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems(prevState => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return  [ ...newItems ];
    });
  };



  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const showTask = (items, s) => {
    return items
      .filter(i => i.status === s.status && i.projectId === project_id)
      .filter(i =>
        String(i.numberTask).toLowerCase().includes(search.toLowerCase()) ||
        String(i.title.toLowerCase()).includes(search.toLowerCase()) ||
        String(`${i.title}#${i.numberTask}`).toLowerCase().includes(search.split(" ").join("").toLowerCase()) ||
        String(`${i.title}${i.numberTask}`).toLowerCase().includes(search.split(" ").join("").toLowerCase())
      )
      .map((i, idx) => (
        <Item
          key={idx}
          setIsDone={(val) => setIsDone(val)}
          item={i}
          index={idx}
          moveItem={moveItem}
          status={s}
        />
      ));
  }

  return (
    <div className={styles.container_task}>
      <div className={styles.container_header}>
        <div className={styles.container_header_col_1}>
          <NavLink to={"/"}>
            <div className={styles.button_header}>
              ◀
            </div>
          </NavLink>
        </div>

        {isDone !== null && isDone === false && (
          <div className={styles.container_header_col_2}>
            <p className={styles.message_warning}>У вас остались еще не выполненые подзадачи!</p>
          </div>
        )}

        {IsAuth() && checkProjectsAuthor(projectsStore, project_id, currentUser) ? (
          <div className={styles.container_header_col_3}>
            <div
              className={styles.button_header}
              onClick={onOpen}
            >
              <div className={styles.container_btn_add_task}>
                <p className={styles.title_btn_add_task}>Добавить задачу</p>
                <p className={styles.icon_btn_add_task}>+</p>
              </div>
            </div>
          </div>
        ) : ("")}
      </div>

      <div className={styles.container_search}>
        <div className={styles.search_input}>
          <input
            type={"search"}
            placeholder={"Введите номер или название задачи..."}
            name={"search"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>



      <div className={styles.container_card}>
        {statuses.map((s, index) => {
          return (
            <div key={index} className={styles.card_item}>
              <h2 className={`${styles.title}`}>{s.status.toUpperCase()}</h2>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Col>
                  {showTask(items, s)}
                </Col>
              </DropWrapper>
            </div>
          );
        })}
      </div>

      <CreateTaskModal
        onClose={onClose}
        show={show}
        project_id={project_id}
      />
    </div>

  );
}