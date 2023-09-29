import { initialState } from "../States/taskInitialState";

const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  EDIT_TASK: 'EDIT_TASK',
};

function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      console.log(action.payload);
      return {
        ...state,
        tasks: [...state.tasks, {
          id: state.tasks.length === 0 ? 0 : Number(state.tasks.length),
          projectId: action.payload.projectId,
          numberTask: action.payload.numberTask,
          title: action.payload.title,
          description: action.payload.description,
          dateOfCreation: action.payload.dateOfCreation,
          timeInWork: action.payload.timeInWork,
          endDate: action.payload.endDate,
          priority: action.payload.priority,
          files: action.payload.files,
          status: action.payload.status,
          subtasks: action.payload.subtasks,
          comments: action.payload.comments,
          icon: action.payload.icon,
          author: action.payload.author
        }],
      };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ActionTypes.EDIT_TASK:
      const { taskId, updatedTask } = action.payload;
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
}

export const editTask = (taskId, updatedTask) => ({
  type: ActionTypes.EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const addTask = (formData) => ({
  type: ActionTypes.ADD_TASK,
  payload: formData,
});

export const removeTask = (taskId) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: taskId,
});

export default TaskReducer;