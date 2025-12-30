import { AxiosResponse } from "axios";
import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import {
  addTaskError,
  addTaskRequest,
  addTaskSuccess,
  fetchTasksError,
  fetchTasksRequest,
  fetchTasksSuccess,
} from "./actions";
import { EToastTypes, ITask } from "@constants/types";
import { loadTasksFromStorage, saveTasksToStorage, showToast } from "@util";
import { ITaskPayload } from "./types";

const selectTasks = (state: any): ITask[] => state.tasksReducer.tasksList;

export function* fetchTasksSaga() {
  try {
    console.log("Fetching all your tasks +++");
    const tasksList: ITask[] = yield call(loadTasksFromStorage);
    yield delay(1000); // Simulate network delay

    console.log("Tasks fetched successfully", tasksList);

    yield put(
      fetchTasksSuccess({
        tasksList,
      })
    );
  } catch (error) {
    showToast({
      type: EToastTypes.ERROR,
      message: "Sorry, we could not find what you are looking for",
    });

    yield put(fetchTasksError({ error: "An error occured getting data" }));
  }
}

export function* addTaskSaga(action: { type: string; payload: ITaskPayload }) {
  try {
    yield delay(500); // Simulate network delay
    const { task, onSuccess } = action.payload;

    console.log("Adding new task +++", task);
    const current: ITask[] = yield select(selectTasks);

    console.log("Current tasks list:", current);

    // prevent duplicates by id (optional safety)
    const next = [task, ...current.filter((t) => t.id !== task.id)];

    yield call(saveTasksToStorage, next);
    yield put(addTaskSuccess(task));
    yield showToast({
      type: EToastTypes.SUCCESS,
      message: "Task added successfully",
    });
    onSuccess?.();
  } catch (error) {
    console.log("Error adding task:", error);
    yield put(addTaskError({ error }));
  }
}

export function* watchTasksSagas() {
  yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
  yield takeLatest(addTaskRequest.type, addTaskSaga);
}
