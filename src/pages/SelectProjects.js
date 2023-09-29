import React, {useState} from "react";
import "./styles/table.css";
import {Link, useNavigate} from "react-router-dom";
import {getAuthorProject, StatusColor, StatusesColors} from "../Variables";
import {useSelector} from "react-redux";
import ProjectModal from "../components/ProjectModal/ProjectModal";
import IsAuth from "../hooks/IsAuth";

export default function SelectProjects() {
  const navigate = useNavigate();
  const projectsStore = useSelector(state => state.project.projects);
  const usersStore = useSelector(state => state.auth.users);
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <div className={"container"}>
        {IsAuth() ? (
          <div className={"container-create-project"}>
            <button
              className={"btn-create-project"}
              onClick={onOpen}
            >Добавить проект</button>
          </div>
        ) : ("")}
        <table className={"table"}
               style={{
                 fontWeight: "bold"
               }}
        >
          <thead style={{
            backgroundColor: "#054F7C",
            color: "white"
          }}>
          <tr>
            <th className={"no-select-text"} style={{
              width: "10rem"
            }}>Номер проекта</th>
            <th className={"no-select-text"}>Название проекта</th>
            <th className={"no-select-text"} style={{
              width: "20rem"
            }}>Владец проекта</th>
            {/*<th  className={"no-select-text"} style={{*/}
            {/*  width: "10rem"*/}
            {/*}}>Статус</th>*/}
          </tr>
          </thead>
          <tbody style={{
            backgroundColor: "#f5eaea"
          }}>
          {projectsStore.length !== 0 ? projectsStore.map((item) => {
            return (
              <tr onClick={() => {
                navigate(`${item.id}`);
              }}>
                <td>{item.id}</td>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>{getAuthorProject(item.user_id, usersStore)}</td>
                {/*<td style={{*/}
                {/*  backgroundColor: StatusColor(item.status),*/}
                {/*  color: "white"*/}
                {/*}}>{item.status}</td>*/}
              </tr>
            )
          }) : (
            <tr id={"projects-not-found"}>
              {/*colspan 4*/}
              <td colSpan={3}>
                Проектов не найдено
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      {/* modal add project */}
      <div>
        <ProjectModal
          onClose={onClose}
          show={show}
        />
      </div>
    </>
  )
}