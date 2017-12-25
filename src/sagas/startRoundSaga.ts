import { put, fork, take, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  modalTextAction, releasePacmanAction, releaseGhostAction, HEAT_END_ACTION, freezeActorsAction, killPacmanAction, resetHeatAction,
  resetRoundAction, hideActorsAction, showLevelAction, increaseLevelAction, bounceGhostAction, bringGhostOutAction, GHOST_LEFT_BOX_ACTION, Action } from "../actions";

export function* startApplicationSaga() {
  yield call(startGameSaga);
}

export function* startGameSaga() {
  let roundOutcome = yield call(startRoundSaga);
  while (!roundOutcome.lost) {
    yield put(hideActorsAction());
    yield delay(500);
    yield put(resetRoundAction());
    yield delay(500);
    yield put(showLevelAction());
    yield delay(500);
    roundOutcome = yield call(startRoundSaga);
  }
}

export function* startRoundSaga() {
  let heatOutcome = yield call(startHeatSaga);
  while (heatOutcome.lost) {
    yield put(resetHeatAction());
    heatOutcome = yield call(startHeatSaga);
  }
  return { lost: heatOutcome.lost }
}


export function* releaseGhostSaga(index: number, msdelay: number) {
  yield delay(msdelay);
  yield put(releaseGhostAction(index));
}

export function* bounceGhostSaga(index: number, msDelay: number) {
  yield put(bounceGhostAction(index));
  yield delay(msDelay);
  yield put(bringGhostOutAction(index));
  yield take((action: Action) => action.type == GHOST_LEFT_BOX_ACTION && action.ghostIndex == index);
  yield put(releaseGhostAction(index));
}

export function* startHeatSaga() {
  yield put(modalTextAction("GET READY!"));
  yield delay(2000);
  yield put(modalTextAction(undefined));

  yield fork(releaseGhostSaga, 0, 0);
  yield fork(bounceGhostSaga, 2, 0)
  yield fork(bounceGhostSaga, 1, 2000);
  yield fork(bounceGhostSaga, 3, 3000);

  yield put(releasePacmanAction());

  const { lost } = yield take(HEAT_END_ACTION);

  yield put(freezeActorsAction());

  if (lost) {
    yield put(killPacmanAction());
    yield delay(1000);
  } else {
    yield put(increaseLevelAction());
  }
  return {
    lost: lost
  }
}