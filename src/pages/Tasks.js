import React, {useEffect, useState} from "react";
import Item from "../components/Item/Item";
import DropWrapper from "../components/DropWrapper/DropWrapper";
import Col from "../components/Col/Col";
import {useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import IsAuth from "../hooks/IsAuth";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";


export default function Tasks() {
  const taskData = useSelector(state => state.tasks);
  const statuses = useSelector(state => state.categories);
  const [items, setItems] = useState([]);
  const { project_id } = useParams();
  const currentUser = useSelector(state => state.auth.currentUser);
  const projectsStore = useSelector(state => state.projects);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setItems(taskData);
  }, [setItems, taskData])

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find(si => si.status === status);

    setItems(prevState => {
      const newItems = prevState
        .filter(i => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [ ...newItems ];
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

  const checkProjectsAuthor = () => {
    return projectsStore.some((project) => {
      return project.id === project_id && project.user_id === currentUser.id
    });
  }

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const showTask = (items, s) => {
    return items
      .filter(i => i.status === s.status && i.projectId === project_id)
      .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}/>);
  }


  return (
    <div className={"container"}>
      <div style={{
        display: "block",
        textAlign: "center",
        paddingLeft: "1.8rem",
        paddingRight: "1.8rem"
      }}>
        <div style={{
          paddingBottom: "4rem"
        }}>
          <div style={{ float: "left" }}>
            <NavLink to={"/"}>
              <p className={"button-back"}>
                ◀ Вернуться к проектам
              </p>
            </NavLink>
          </div>
          {IsAuth() && checkProjectsAuthor() ? (
            <div style={{ float: "right" }}>
              <p
                className={"button-back"}
                onClick={onOpen}
              >
                Добавить задачу
              </p>
            </div>
          ) : ("")}
        </div>
      </div>

      <div className={"row"}>
        {statuses.map((s, index) => {
          return (
            // eslint-disable-next-line no-restricted-globals
            <div key={index} className={"col-wrapper"}>
              <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
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