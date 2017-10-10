import { takeEvery } from 'redux-saga/effects';
import { startRoundSaga } from "./startRoundSaga";
import { START_APPLICATION_ACTION } from "../actions";

export function* rootSaga() {
  yield takeEvery(START_APPLICATION_ACTION, startRoundSaga);
}