import React from "react";
import {StatusesColors} from "../../Variables";
import "./ColorizeWrapText.css";


export default function ColorizeWrapText({ text, label, type }) {
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

    return (
        <div className={"wrap-container"}>
            {type === "title" ? (
              <h1>{label}</h1>
            ) : (
              <h3>{label}</h3>
            )}

            <p style={{backgroundColor: StatusColor(text)}} className={"wrap-text"}>{text}</p>
        </div>
    )
}