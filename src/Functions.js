import React, {useEffect, useState} from "react";
import {ReactComponent as IconEditSVG} from "./icons/edit.svg";
import {endTask} from "./store/Actions/Actions";

export const StatusesColors = {
  Queue: "#eba946",
  Development: "#00C2E0",
  Done: "#70a138",
  Height: "#f36464",
  Default: "#a1a1a1"
}

export const getAuthorProject = (project_user_id, usersStore) => {
  if (project_user_id !== null) {
    const author = usersStore.find(user => {
      return user.id === project_user_id;
    })

    if (author !== undefined) {
      return author.username;
    }

    return "Пользователь не найден";
  } else {
    return "Пользователь не найден";
  }
}

export const getUser = (user_id, users) => {
  return users.find(user => {
    return user.id === user_id;
  })
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export const getCurrentDate = (date, withTime) => {
  const currentDate = new Date(date);

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  let time = '';

  if (withTime) {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Use template literals to format the time component
    time = ` - ${hours}:${minutes}:${seconds}`;
  }

  // Use template literals to format the date component
  return `${day}.${month}.${year}${time}`;
}

export function calculateTimeInWork(startDate, endDate) {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return "Invalid date input";
  }

  const timeDifference = endDateTime - startDateTime;
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(timeDifference / millisecondsInDay);
  const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
  const seconds = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);

  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} days`);
  }
  if (hours > 0) {
    timeParts.push(`${hours} hours`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} minutes`);
  }
  if (seconds > 0) {
    timeParts.push(`${seconds} seconds`);
  }

  if (timeParts.length !== 0) {
    return timeParts.join(" ");
  } else {
    return "Слишком быстро)";
  }
}

export const checkProjectsAuthor = (projects_store, project_id, current_user) => {
  return projects_store.some((project) => {
    return project.id === project_id && project.user_id === current_user.id
  });
}

export const showShortNameFile = (fileName, maxShowSymbols) => {
  const lastIndex = fileName.lastIndexOf(".");

  if (lastIndex !== -1) {
    const fileExtension = fileName.substring(lastIndex, fileName.length);
    return `${fileName.substring(0, maxShowSymbols)}...${fileExtension}`;
  }

  return fileName.substring(0, maxShowSymbols);
}

export const maxSizeFileUpload = 104857600;


export const getSubtask = (data, subtasksStore) => {
  return subtasksStore.filter(item => data.includes(item.id));
}

export const EditView = ({ tag, handleChange, value, style }) => {
  const Tag = tag || "h1"

  const handleBlur = (e) => {
    const newValue = e.currentTarget.textContent.trim();
    handleChange(newValue);
  };

  return (
    <div>
      {!value && <div className="errors">Значение не может быть пустым.</div>}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: "40px",
        marginTop: "4px"
      }}>
        <Tag
          className={`shadow-box`}
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: !value ? '#d00000' : '',
            minWidth: "100px",
            padding: "0.3rem",
            ...style
          }}
          suppressContentEditableWarning={true}
          contentEditable='true'
          onBlur={handleBlur}
        >
          {value}
        </Tag>
      </div>
    </div>
  );
};


export const setRangeValuePriority = (value) => {
  if (value === "low") {
    return {
      value: 0,
      color: StatusesColors.Queue,
    };
  } else if (value === "medium") {
    return {
      value: 1,
      color: StatusesColors.Development,
    };
  } else if (value === "height") {
    return {
      value: 2,
      color: StatusesColors.Height,
    };
  }
}

export const setRangeValueStatus = (value) => {
  if (value === "queue") {
    return {
      value: 0,
      color: StatusesColors.Queue,
    };
  } else if (value === "development") {
    return {
      value: 1,
      color: StatusesColors.Development,
    };
  } else if (value === "done") {
    return {
      value: 2,
      color: StatusesColors.Done,
    };
  }
}

export const priorities = {
  0: "low",
  1: "medium",
  2: "height",
}

export const statuses = {
  0: "queue",
  1: "development",
  2: "done",
}

export const checkIsDoneSubtask = (item, taskData, subtasksStore, setIsDone, dispatch) => {
  const subtasks = getSubtask(taskData.find(i => i.id === item.id).subtasks, subtasksStore);
  const allSubtasksDone = subtasks.every(obj => obj.statusSubtask === "done");

  if (!allSubtasksDone) {
    setIsDone(allSubtasksDone);
  } else {
    setIsDone(allSubtasksDone);
    dispatch(endTask("done", new Date(), item.id, "✅️"));
  }
}