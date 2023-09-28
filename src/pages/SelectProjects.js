import React from "react";
import "./styles/table.css";
import {Link} from "react-router-dom";

export default function SelectProjects() {
  const projectData = [
    {
      id: 1,
      title: "project 1",
      status: "Done"
    },
    {
      id: 23,
      title: "project 23",
      status: "Development"
    },
  ]



  return (
    <div>
      <p>Page Select Project</p>

      <table>
        <thead>
          <tr>
            <th>Номер проекта</th>
            <th>Название проекта</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
        {projectData.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>
              <p>{item.title}</p>
              <Link to={`${item.id}`}>перейти</Link>
            </td>
            <td>{item.status}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}