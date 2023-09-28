import React, {useState} from "react";
import "./styles/table.css";
import {Link, useNavigate} from "react-router-dom";
import {StatusColor, StatusesColors} from "../Variables";
import {useSelector} from "react-redux";

export default function SelectProjects() {
  const navigate = useNavigate();
  const projectsStore = useSelector(state => state.projects.projects);
  const usersStore = useSelector(state => state.auth.users);

  const getAuthorProject = (project_user_id) => {
    if (project_user_id !== null) {
      const author = usersStore.find(user => {
        return user.id === project_user_id
      })

      if (author !== undefined) {
        return author;
      }

      return "Пользователь не найден";
    } else {
      return "Пользователь не найден";
    }
  }

  return (
    <div className={"container"}>
      <div className={"container-create-project"}>
        <button className={"btn-create-project"}>Добавить проект</button>
      </div>
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
            <th style={{
              width: "10rem"
            }}>Номер проекта</th>
            <th>Название проекта</th>
            <th style={{
              width: "20rem"
            }}>Владец пректа</th>
            <th style={{
              width: "10rem"
            }}>Статус</th>
          </tr>
        </thead>
        <tbody style={{
          backgroundColor: "#f5eaea"
        }}>
          {projectsStore.map((item) => {
            return (
              <tr onClick={() => {
                navigate(`${item.id}`);
              }}>
                <td>{item.id}</td>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>
                  <p>{getAuthorProject(item.user_id)}</p>
                </td>
                <td style={{
                  backgroundColor: StatusColor(item.status),
                  color: "white"
                }}>{item.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}