import React, {useState} from "react";
import "./styles/table.css";
import {Link, useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();


  return (
    <div className={"container"}>
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
              width: "10rem"
            }}>Статус</th>
          </tr>
        </thead>
        <tbody style={{
          backgroundColor: "#f5eaea"
        }}>
          {projectData.map((item) => {
            return (
              <tr onClick={() => {
                navigate(`${item.id}`);
              }}>
                <td>{item.id}</td>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>{item.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}