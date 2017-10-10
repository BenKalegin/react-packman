import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { modalTextAction } from "../actions";

export function* startRoundSaga() {
  yield put(modalTextAction("GET READY!"));
  yield delay(2000);
  yield put(modalTextAction(undefined));
}