import { AppState } from "../root.reducer";

export const getAllTasks = (app: AppState) => app.tasksReducer.tasksList;

export const getAllCompleteTasks = (app: AppState) =>
  app.tasksReducer.completedTasks;
