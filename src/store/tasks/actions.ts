import { createAction } from "@reduxjs/toolkit";
import { IDeleteTaskPayload, ITaskPayload, TasksState } from "./types";
import { ITask } from "@constants/types";

// ===== GET LIST OF TASKS

export const GET_TASKS_LOADING_KEY = "@DATA/GET_ALL_TAKS";

export const fetchTasksRequest = createAction("@DATA/GET_ALL_TAKS_API_REQUEST");
export const fetchTasksSuccess = createAction<Partial<TasksState>>(
  "@DATA/GET_ALL_TAKS_API_SUCCESS"
);
export const fetchTasksError = createAction<{
  error: string;
}>("@DATA/GET_ALL_TAKS_API_ERROR");

// ===== ADD NEW TASK

export const ADD_TASK_LOADING_KEY = "@DATA/ADD_TASK";

export const addTaskRequest = createAction<ITaskPayload>(
  "@DATA/ADD_TASK_API_REQUEST"
);
export const addTaskSuccess = createAction<ITask>("@DATA/ADD_TASK_API_SUCCESS");
export const addTaskError = createAction<{
  error: unknown;
}>("@DATA/ADD_TASK_API_ERROR");

// ===== TOGGLE TASK COMPLETION

export const TOGGLE_TASK_COMPLETION_KEY = "@DATA/TOGGLE_TASK_COMPLETION";

export const toggleTaskCompletion = createAction<{
  task: ITask;
}>("@DATA/TOGGLE_TASK_COMPLETION_ACTION");

// ===== DELETE TASK

export const DELETE_TASK_LOADING_KEY = "@DATA/DELETE_TASK";

export const deleteTaskRequest = createAction<IDeleteTaskPayload>(
  "@DATA/DELETE_TASK_API_REQUEST"
);
export const deleteTaskSuccess = createAction<{ taskId: string }>(
  "@DATA/DELETE_TASK_API_SUCCESS"
);
export const deleteTaskError = createAction<{
  error: unknown;
}>("@DATA/DELETE_TASK_API_ERROR");
