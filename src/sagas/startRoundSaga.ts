import { put, fork, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  modalTextAction, releasePacmanAction, releaseGhostAction, HEAT_END_ACTION, freezeActorsAction, killPacmanAction, resetHeatAction
  } from "../actions";

export function* startApplicationSaga() {
  yield call(startRoundSaga);
}

export function* startRoundSaga() {
  let heatOutcome = yield call(startHeatSaga);
  while (heatOutcome.lost) {
    yield put(resetHeatAction());
    heatOutcome = yield call(startHeatSaga);
  }
}

export function* releaseGhostSaga(index: number, msdelay: number) {
  yield delay(msdelay);
  yield put(releaseGhostAction(index));
}

export function* startHeatSaga() {
  yield put(modalTextAction("GET READY!"));
  yield delay(2000);
  yield put(modalTextAction(undefined));

  yield fork(releaseGhostSaga, 0, 0);
  yield fork(releaseGhostSaga, 1, 0);
  yield fork(releaseGhostSaga, 2, 2000);
  yield fork(releaseGhostSaga, 3, 3000);

  yield put(releasePacmanAction());

  const { lost } = yield take(HEAT_END_ACTION);

  yield put(freezeActorsAction());

  if (lost) {
    yield put(killPacmanAction());
    yield delay(1000);
  }
  return {
    lost: lost
  }
}