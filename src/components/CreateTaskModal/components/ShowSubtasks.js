import React from "react";


const ShowSubtasks = ({ data }) => {
  return (
    <table style={{
      borderCollapse: "collapse",
      width: "100%",
      borderRadius: "0.3rem",
      overflow: "hidden",
      border: "solid",
      borderColor: "black",
      borderWidth: "1px"
    }}>
      <thead>
      <tr style={{
        backgroundColor: "#054F7C",
        color: "white",
      }}>
        <th>Заголовок подзадачи</th>
        <th>Номер подзадачи</th>
        <th>Описание подзадачи</th>
        <th>Приоритет подзадачи</th>
        <th>Статус подзадачи</th>
      </tr>
      </thead>
      <tbody style={{
        backgroundColor: "#fff0dc",
      }}>
      {
        data.map((subtask, index) => {
          return (
            <tr key={index}>
              <td>
                {subtask.titleSubtask}
              </td>
              <td>
                {subtask.numberSubtask}
              </td>
              <td>
                {subtask.descriptionSubtask}
              </td>
              <td>
                {subtask.prioritySubtask}
              </td>
              <td>
                {subtask.statusSubtask}
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}

export default ShowSubtasks;