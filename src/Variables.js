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