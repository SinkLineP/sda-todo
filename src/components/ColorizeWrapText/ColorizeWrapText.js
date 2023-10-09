import React, {useState} from "react";
import {EditView, StatusesColors} from "../../Functions";
import "./ColorizeWrapText.css";


export default function ColorizeWrapText({ text, label, type, isEditing, setEditValue, numberTask, setValue, value }) {
    const StatusColor = (status) => {
        if (status.toLowerCase() === "height") {
            return StatusesColors.Height;
        } else if (status.toLowerCase() === "queue" || status.toLowerCase() === "low") {
            return StatusesColors.Queue;
        } else if (status.toLowerCase() === "development" || status.toLowerCase() === "medium") {
            return StatusesColors.Development;
        } else if (status.toLowerCase() === "done") {
            return StatusesColors.Done;
        } else {
            // Если статус не совпадает ни с одним из вышеперечисленных, вернуть значение по умолчанию или undefined.
            return StatusesColors.Default; // или StatusesColors.Default или что-то ещё по вашему выбору
        }
    }


    const handleChange = (T) => {
      setValue(T);
      setEditValue(T);
    }



    const IsEdit = ({isEditing, type, label}) => {
        if (isEditing) {
            if (type === "title") {
              return <EditView>
                <h1
                  className={"shadow-box"}
                  style={{
                    borderWidth: "1px",
                    borderColor: "#cccccc",
                    borderStyle: "solid",
                    borderRadius: "0.3rem",
                    minWidth: "100px"
                  }}
                  suppressContentEditableWarning={true}
                  contentEditable='true'
                  onBlur={e => handleChange(e.currentTarget.textContent)}
                >{value}</h1>
                <h1 style={{
                  marginLeft: "20px"
                }}> #{numberTask}</h1>
              </EditView>
            } else {
              return (
                <>
                  <h3>{label}</h3>
                </>
              )
            }
        } else {
            if (type === "title") {
              return (
                <>
                  <h1>{label}</h1>
                  <h1 style={{
                    marginLeft: "20px"
                  }}> #{numberTask}</h1>
                </>
              )
            } else {
              return (
                <>
                  <h3>{label}</h3>
                </>
              )
            }
        }
    }

    return (
      <>
      {type === "title" && value === "" && <p className={"errors"}>Поле не должно быть пустым</p>}
        <div className={"wrap-container"}>
            <IsEdit type={type} isEditing={isEditing} label={label} />
            <p style={{backgroundColor: StatusColor(text)}} className={"wrap-text"}>{text}</p>
        </div>
      </>
    )
}