import { all } from "redux-saga/effects";
import { watchTasksSagas } from "./tasks/sagas";
export default function* sagas() {
  yield all([watchTasksSagas()]);
}
