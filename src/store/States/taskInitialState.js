export const initialState = {
  tasks: [
    {
      id: 1,
      projectId: 1,
      title: "Задача",
      description: "Описание задачи 1",
      dateOfCreation: "2023-09-27",
      timeInWork: "2 часа",
      endDate: "2023-09-30",
      priority: "Средний",
      files: ["file1.docx", "file2.pdf"],
      status: "done",
      subtasks: true,
      comments: true,
      icon: "⭕️",
    },
    {
      id: 23,
      projectId: 23,
      title: "Задача",
      description: "Описание задачи 2",
      dateOfCreation: "2023-09-27",
      timeInWork: "5 часа",
      endDate: "2023-09-30",
      priority: "Средний",
      files: ["file1.docx", "file23.pdf"],
      status: "development",
      subtasks: true,
      comments: true,
      icon: "⭕️",
    }
  ]
}