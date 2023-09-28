import React, {Fragment, useState, useRef, useEffect} from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "../Window/Window"
import ITEM_TYPE from "../../data/types";
import {editTask} from "../../store/Reducers/taskReducer";
import {useDispatch} from "react-redux";

const Item = ({ item, index, moveItem, status }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();


  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
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
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { ...item, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));


  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  drag(drop(ref));


  useEffect(() => {
    if (!isDragging) {
      dispatch(editTask(item.id, item))
    }
  }, [])

  return (
    <Fragment>
      {/*card task*/}
      <div
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item"}
        onClick={onOpen}
      >
        <div className={"color-bar"} style={{ backgroundColor: status.color }}/>
        <p className={"item-title"}>{item.title} #{item.id}</p>
        <p className={"item-status"}>{item.icon}</p>
      </div>

      {/*modal window*/}
      <Window
        item={item}
        onClose={onClose}
        show={show}
      />
    </Fragment>
  );
};

export default Item;