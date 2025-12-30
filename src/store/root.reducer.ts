import { combineReducers } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/reducer";
import { tasksReducer } from "./tasks/reducer";

export const reducers = combineReducers({
  loadingReducer,
  tasksReducer,
});

export type AppState = ReturnType<typeof reducers>;
