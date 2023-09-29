export const StatusesColors = {
  Queue: "#eba946",
  Development: "#00C2E0",
  Done: "#70a138"
}

export const StatusColor = (status) => {
  if (status.toLowerCase() === "queue") {
    return StatusesColors.Queue;
  } else if (status.toLowerCase() === "development") {
    return StatusesColors.Development
  } else if (status.toLowerCase() === "done") {
    return  StatusesColors.Done
  }
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