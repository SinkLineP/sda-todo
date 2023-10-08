import React, {useEffect, useState} from "react";
import Item from "../components/Item/Item";
import DropWrapper from "../components/DropWrapper/DropWrapper";
import Col from "../components/Col/Col";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import IsAuth from "../hooks/IsAuth";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import styles from "./styles/Tasks.module.css";
import {addTask, endTask, startTask} from "../store/Reducers/taskReducer";
import {checkProjectsAuthor, getSubtask} from "../Functions";


export default function Tasks() {
  const taskData = useSelector(state => state.tasks);
  const statuses = useSelector(state => state.categories);
  const [items, setItems] = useState([]);
  const { project_id } = useParams();
  const currentUser = useSelector(state => state.auth.currentUser);
  const projectsStore = useSelector(state => state.projects);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const subtasksStore = useSelector(state => state.subtasks);


  useEffect(() => {
    setItems(taskData);
  }, [setItems, taskData])

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find(si => si.status === status);

    // Проверка выполненных подзадач
    if (status === "done" && item.status !== "done") {
      const subtasks = getSubtask(item.subtasks, subtasksStore);
      const allSubtasksDone = subtasks.every(obj => obj.statusSubtask === "done");
      if (!allSubtasksDone) {
        // Если не все подзадачи выполнены, то не разрешаем перемещение в "done"
        return;
      }
    }

    setItems(prevState => {
      const newItems = prevState
        .filter(i => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });

      return [...newItems];
    });
  };

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
      .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} project_id={project_id} isOver={s.status === "done" && i.status === s.status} />);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <div>
          <NavLink to={"/"}>
            <p className={styles.button_header}>
              ◀ Вернуться к проектам
            </p>
          </NavLink>
        </div>
        {IsAuth() && checkProjectsAuthor(projectsStore, project_id, currentUser) ? (
          <div>
            <p
              className={styles.button_header}
              onClick={onOpen}
            >
              Добавить задачу
            </p>
          </div>
        ) : ("")}
      </div>

      <div className={styles.container_search}>
        <div className={styles.search_input}>
          <input
            type={"search"}
            placeholder={"Введите номер или название задачи..."}
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