import React from "react";
import {StatusesColors} from "../../Variables";
import "./ColorizeWrapText.css";


export default function ColorizeWrapText({ text, label, type }) {
    const StatusColor = (status) => {
        if (status.toLowerCase() === "height") {
            return StatusesColors.Height
        }

        if (status.toLowerCase() === "queue" || "low") {
            return StatusesColors.Queue;
        } else if (status.toLowerCase() === "development" || "medium") {
            return StatusesColors.Development
        } else if (status.toLowerCase() === "done") {
            return StatusesColors.Done
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