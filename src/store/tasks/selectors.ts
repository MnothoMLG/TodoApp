import { AppState } from "../root.reducer";

export const getAllCharacters = (app: AppState) => app.tasksReducer.tasksList;

export const getAllFavourites = (app: AppState) =>
  app.tasksReducer.completedTasks;
