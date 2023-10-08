import React, {Fragment, useState, useRef, useEffect} from "react";
import { useDrag, useDrop } from "react-dnd";
import InfoTask from "../InfoTask/InfoTask";
import ITEM_TYPE from "../../data/types";
import {useDispatch, useSelector} from "react-redux";
import {
  startTask,
  endTask,
  editTask,
  editStartDate,
  editEndDate
} from "../../store/Reducers/taskReducer";
import IsAuth from "../../hooks/IsAuth";
import styles from "./Item.module.css";
import {getSubtask} from "../../Functions";

const Item = ({ item, index, moveItem, status, setIsDone }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const tasksStore = useSelector(state => state.tasks);
  const taskData = useSelector(state => state.tasks);
  const subtasksStore = useSelector(state => state.subtasks);


  // Определение, разрешено ли перетаскивание
  const isDraggable = IsAuth();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(draggedItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      // Обновите объект draggedItem с правильным индексом и передайте его в editTask
      const updatedItem = { ...draggedItem, index: hoverIndex };
      dispatch(editTask(updatedItem.id, updatedItem));
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { ...item, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable && item.status !== "done", // Добавьте эту проверку
  }));

  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  // Обработка начала задачи
  const handleStartTask = (e) => {
    e.stopPropagation();
    if (item.status === "queue") {
      dispatch(startTask("development", new Date(), item.id, "🔆️"));
    }
  };

  // Обработка завершения задачи
  const handleEndTask = (e) => {
    e.stopPropagation();
    if (item.status === "development") {
      // Проверка выполненных подзадач
      const subtasks = getSubtask(taskData.find(i => i.id === item.id).subtasks, subtasksStore);
      const allSubtasksDone = subtasks.every(obj => obj.statusSubtask === "done");

      if (!allSubtasksDone) {
        setIsDone(allSubtasksDone);
      } else {
        setIsDone(allSubtasksDone);
        dispatch(endTask("done", new Date(), item.id, "✅️"));
      }
    }
  };

  drag(drop(ref));

  const startDate = new Date();
  const endDate = new Date();

  useEffect(() => {
    if (!isDragging) {
      if (item.status === "queue" && tasksStore.find(task => task.id === item.id).startDate !== null) {
        dispatch(editStartDate(item.id, null, item.status, "⭕️"));
        dispatch(editEndDate(item.id, null, item.status, "⭕️"));
      }

      if (item.status === "development" && tasksStore.find(task => task.id === item.id).startDate === null) {
        dispatch(editStartDate(item.id, startDate, item.status, "🔆️"));
        dispatch(editEndDate(item.id, null, item.status, "🔆️"));
      }

      if (item.status === "done" && tasksStore.find(task => task.id === item.id).startDate !== null && tasksStore.find(task => task.id === item.id).endDate === null) {
        dispatch(editStartDate(item.id, tasksStore.find(task => task.id === item.id).startDate, item.status, "✅️"));
        dispatch(editEndDate(item.id, endDate, item.status, "✅️"));
      }
    }
  }, [dispatch, isDragging, item.status, item.subtasks]);

  return (
    <Fragment>
      {/* Карточка задачи */}
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item shadow-box"}
        onClick={onOpen}
      >
        <div className={"color-bar shadow-box"} style={{ backgroundColor: status.color }} />
        <p className={"item-title"}>
          {item.title} #{item.numberTask}
        </p>
        {item.subtasks.length > 0 ? (<p>Колличество подзадач: {item.subtasks.length}</p>) : (<p>Подзадач не найденно!</p>)}

        <p className={"item-status"}>{item.icon}</p>
        {/* Кнопка начала задачи */}
        {item.status === "queue" && IsAuth() && (
          <button className={`${styles.btn_item} ${styles.btn_start} shadow-box`} onClick={(e) => handleStartTask(e)}>Начать задачу</button>
        )}

        {/* Кнопка завершения задачи */}
        {item.status === "development" && IsAuth() && (
          <button className={`${styles.btn_item} ${styles.btn_stop} shadow-box`} onClick={(e) => handleEndTask(e)}>Завершить задачу</button>
        )}
      </div>

      {/* Модальное окно с информацией о задаче */}
      <InfoTask item={item} onClose={onClose} show={show} />
    </Fragment>
  );
};

export default Item;