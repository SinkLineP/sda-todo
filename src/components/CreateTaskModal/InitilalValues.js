export const initialValuesTasks = {
  title: "",
  file: null,
  numberTask: '',
  description: '',
  priority: 'low',
  status: 'queue',
};
export const initialValuesSubTasks = {
  titleSubtask: "",
  numberSubtask: '',
  descriptionSubtask: '',
  prioritySubtask: 'low',
  statusSubtask: 'queue',
};

export const combinedInitialValues = {
  ...initialValuesTasks,
  ...initialValuesSubTasks,
};