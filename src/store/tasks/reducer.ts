import { createReducer } from "@reduxjs/toolkit";
import {
  addTaskSuccess,
  fetchTasksError,
  fetchTasksSuccess,
  toggleTaskCompletion,
} from "./actions";
import { TasksState } from "./types";
import { EToastTypes, ITask } from "@constants/types";
import { showToast } from "@util";

const INITIAL_STATE: TasksState = {
  tasksList: [],
  completedTasks: [],
};

const standardCallBack = (
  state: TasksState,
  action: { type: string; payload: Partial<TasksState> }
) => {
  if (action.payload) {
    return { ...state, ...action.payload };
  }
};

export const tasksReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(fetchTasksSuccess, standardCallBack)
    .addCase(fetchTasksError, (state: TasksState) => {
      return { ...state, tasksList: [] };
    })
    .addCase(addTaskSuccess, (state: TasksState, action) => {
      return {
        ...state,
        tasksList: [action.payload, ...state.tasksList],
      };
    })
    .addCase(toggleTaskCompletion, (state: TasksState, action) => {
      const { task } = action.payload;
      const isAlreadyCompleted = state.completedTasks.some(
        (t) => t.id === task.id
      );

      let updatedCompletedTasks: Array<ITask>;
      if (isAlreadyCompleted) {
        // Remove from completed tasks
        updatedCompletedTasks = state.completedTasks.filter(
          (t) => t.id !== task.id
        );
        showToast({
          type: EToastTypes.SUCCESS,
          message: `Marked "${task.title}" as incomplete.`,
        });
      } else {
        // Add to completed tasks
        updatedCompletedTasks = [...state.completedTasks, task];
        showToast({
          type: EToastTypes.SUCCESS,
          message: `Marked "${task.title}" as complete!`,
        });
      }

      return {
        ...state,
        completedTasks: updatedCompletedTasks,
      };
    });
});
