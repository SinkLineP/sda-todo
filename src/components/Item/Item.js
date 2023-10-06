import React, {Fragment, useState, useRef, useEffect} from "react";
import { useDrag, useDrop } from "react-dnd";
import InfoTask from "../InfoTask/InfoTask";
import ITEM_TYPE from "../../data/types";
import {useDispatch, useSelector} from "react-redux";
import {startTask, endTask, editTask} from "../../store/Reducers/taskReducer";
import IsAuth from "../../hooks/IsAuth";
import {checkProjectsAuthor} from "../../Functions";

const Item = ({ item, index, moveItem, status, project_id }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const tasksStore = useSelector(state => state.tasks);
  const currentUser = useSelector(state => state.auth.currentUser);
  const projectsStore = useSelector(state => state.projects);


  // Определение, разрешено ли перетаскивание
  const isDraggable = item.status !== "done" && IsAuth();

  const [, drop] = useDrop({
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
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable, // Условие разрешения перетаскивания
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
      dispatch(endTask("done", new Date(), item.id, "✅️"));
    }
  };

  drag(drop(ref));

  const startDate = new Date();
  const endDate = new Date();

  useEffect(() => {
    if (!isDragging) {
      if (item.status === "development" && tasksStore.find(task => task.id === item.id).startDate === null) {
        dispatch(editTask(item.id, {
          ...item,
          startDate: startDate
        }));
      } else if (item.status === "queue" && tasksStore.find(task => task.id === item.id).startDate !== null) {
        dispatch(editTask(item.id, {
          ...item,
          startDate: null,
          endDate: null
        }));
      } else if (item.status === "done" && tasksStore.find(task => task.id === item.id).startDate !== null && tasksStore.find(task => task.id === item.id).endDate === null) {
        dispatch(editTask(item.id, {
          ...item,
          startDate: tasksStore.find(task => task.id === item.id).startDate,
          endDate: endDate
        }));
      } else {
        dispatch(editTask(item.id, item));
      }
    }
  }, [dispatch, isDragging, item.status]);

  return (
    <Fragment>
      {/* Карточка задачи */}
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item"}
        onClick={onOpen}
      >
        <div className={"color-bar"} style={{ backgroundColor: status.color }} />
        <p className={"item-title"}>
          {item.title} #{item.numberTask}
        </p>
        <p className={"item-status"}>{item.icon}</p>
        {/* Кнопка начала задачи */}
        {item.status === "queue" && IsAuth() && checkProjectsAuthor(projectsStore, project_id, currentUser) && (
          <button onClick={(e) => handleStartTask(e)}>Начать задачу</button>
        )}

        {/* Кнопка завершения задачи */}
        {item.status === "development" && IsAuth() && checkProjectsAuthor(projectsStore, project_id, currentUser) && (
          <button onClick={(e) => handleEndTask(e)}>Завершить задачу</button>
        )}
      </div>

      {/* Модальное окно с информацией о задаче */}
      <InfoTask item={item} onClose={onClose} show={show} />


    </Fragment>
  );
};

export default Item;