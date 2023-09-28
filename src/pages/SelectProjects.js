import React, {useState} from "react";
import "./styles/table.css";
import {Link, useNavigate} from "react-router-dom";
import {StatusesColors} from "../Variables";

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

  const StatusColor = (status) => {
    console.log(status);

    if (status === "Queue") {
      return {
        backgroundColor: StatusesColors.Queue,
        color: "white"
      }
    } else if (status === "Development") {
      return {
        backgroundColor: StatusesColors.Development,
        color: "white"
      }
    } else if (status === "Done") {
      return {
        backgroundColor: StatusesColors.Done,
        color: "white"
      }
    }
  }

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
                <td style={StatusColor(item.status)}>{item.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}