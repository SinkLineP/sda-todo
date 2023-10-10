export const deleteSubtask = (item, location, setData, task_id, data, dispatchFunc) => {
  if (location === "form") {
    return setData(data.filter((subtask) => subtask.id !== item.id));
  } else {
    return dispatchFunc()
  }
};