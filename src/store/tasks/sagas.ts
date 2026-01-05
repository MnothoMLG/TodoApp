import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import {
  addTaskError,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  fetchTasksError,
  fetchTasksRequest,
  fetchTasksSuccess,
} from "./actions";
import { EToastTypes, ITask } from "@constants/types";
import { loadTasksFromStorage, saveTasksToStorage, showToast } from "@util";
import { IDeleteTaskPayload, ITaskPayload } from "./types";

const selectTasks = (state: any): ITask[] => state.tasksReducer.tasksList;

export function* fetchTasksSaga() {
  try {
    const tasksList: ITask[] = yield call(loadTasksFromStorage);
    yield delay(1000); // Simulate network delay

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
    const current: ITask[] = yield select(selectTasks);

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

export function* deleteTaskSaga(action: {
  type: string;
  payload: IDeleteTaskPayload;
}) {
  try {
    yield delay(300); // Simulate network delay
    const { taskId, taskTitle, onSuccess, onFailure } = action.payload;
    const current: ITask[] = yield call(loadTasksFromStorage);

    const next = current.filter((task) => task.id !== taskId);

    if (next.length === current.length) {
      const reason = "Task not found";
      onFailure?.(reason);
      return;
    }

    yield call(saveTasksToStorage, next);
    yield put(deleteTaskSuccess({ taskId }));
    yield showToast({
      type: EToastTypes.SUCCESS,
      message: `"${taskTitle ?? "Task"}" deleted successfully`,
    });
    onSuccess?.();
  } catch (error) {
    console.log("Error deleting task:", error);
    yield put(deleteTaskError({ error }));
    showToast({
      type: EToastTypes.ERROR,
      message: "Failed to delete task. Please try again.",
    });
    action.payload.onFailure?.("Failed to delete task");
  }
}

export function* watchTasksSagas() {
  yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
  yield takeLatest(addTaskRequest.type, addTaskSaga);
  yield takeLatest(deleteTaskRequest.type, deleteTaskSaga);
}
