import React, {useState} from "react";
import Item from "../components/Item/Item";
import DropWrapper from "../components/DropWrapper/DropWrapper";
import Col from "../components/Col/Col";
import {useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import IsAuth from "../hooks/IsAuth";


export default function Tasks() {
  const taskData = useSelector(state => state.tasks.tasks);
  const statuses = useSelector(state => state.categories);
  const [items, setItems] = useState(taskData);
  const { project_id } = useParams();
  const currentUser = useSelector(state => state.auth.currentUser);
  const projectsStore = useSelector(state => state.project.projects);


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
      return project.id === Number(project_id) && project.user_id === currentUser.id
    });
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
              <p className={"button-back"}>
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
                  {items
                    .filter(i => i.status === s.status && i.projectId === Number(project_id))
                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s}/>)
                  }
                </Col>
              </DropWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
}