import {initialState} from "../States/taskInitialState";
import {priorities} from "../../Functions";
import {TASKActionTypes} from "../Types/ActionTypes.js";

function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case TASKActionTypes.ADD_TASK:
      return [...state, action.payload];

    case TASKActionTypes.ADD_COMMENT_TO_TASK:
      const { commentID, taskID } = action.payload;
      return state.map((task) => {
        if (task.id === taskID) {
          return {
            ...task,
            comments: [...task.comments, commentID]
          }
        }
        return task;
      });

    case TASKActionTypes.ADD_SUBTASK_TO_TASK:
      const { subtask_ID, ID_task } = action.payload;
      return state.map((task) => {
        if (task.id === ID_task) {
          return {
            ...task,
            subtasks: [...task.subtasks, subtask_ID]
          }
        }
        return task;
      });

    case TASKActionTypes.REMOVE_SUBTASK_FROM_TASK:
      const { subtaskID, task_ID } = action.payload;

      return state.map((task) => {
        if (task.id === task_ID) {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => subtask !== subtaskID)
          };
        }
        return task;
      });

    case TASKActionTypes.REMOVE_COMMENT_FROM_TASK:
      const { commentId, task_id } = action.payload;

      return state.map((task) => {
        if (task.id === task_id) {
          return {
            ...task,
            comments: task.comments.filter((subtask) => subtask !== commentId)
          };
        }
        return task;
      });

    case TASKActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      return state.map((task) => {
        return task.id === taskId ? {...task, ...updatedTask} : task
      });

    case TASKActionTypes.START_TASK:
      const { status_start, startDate, Id_task_start, icon_start } = action.payload;

      return state.map((task) => {
        if (task.id === Id_task_start) {
          return {
            ...task,
            status: status_start,
            startDate: startDate,
            icon: icon_start
          };
        }
        return task;
      });

    case TASKActionTypes.END_TASK:
      const { status_end, endDate, Id_task_end, icon_end } = action.payload;

      return state.map((task) => {
        if (task.id === Id_task_end) {
          return {
            ...task,
            status: status_end,
            endDate: endDate,
            icon: icon_end
          };
        }
        return task;
      });

    case TASKActionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case TASKActionTypes.EDIT_STATUS_TASK:
      const { id_status, status } = action.payload;
      return state.map((task) => {
        if (task.id === id_status) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });

    case TASKActionTypes.EDIT_PRIORITY_TASK:
      const { id_priority, priority } = action.payload;
      return state.map((task) => {
        if (task.id === id_priority) {
          console.log({
            ...task,
            priority: priorities[priority],
          });
          return {
            ...task,
            priority: priorities[priority],
          };
        }
        return task;
      });

    case TASKActionTypes.EDIT_START_DATE:
      const { id_start, start_date, start_status, start_icon } = action.payload;
      return state.map((task) => {
        if (task.id === id_start) {
          return {
            ...task,
            startDate: start_date,
            status: start_status,
            icon: start_icon
          };
        }
        return task;
      });

    case TASKActionTypes.EDIT_END_DATE:
      const { id_end, end_date, end_status, end_icon } = action.payload;
      return state.map((task) => {
        if (task.id === id_end) {
          return {
            ...task,
            endDate: end_date,
            status: end_status,
            icon: end_icon
          };
        }
        return task;
      });

    default:
      return state;
  }
}


export default TaskReducer;