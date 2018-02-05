import { put, fork, take, call, cancel } from 'redux-saga/effects';
import { delay, Task } from 'redux-saga';
import {
  modalTextAction, releasePacmanAction, releaseGhostAction, HEAT_END_ACTION, freezeActorsAction, killPacmanAction, resetHeatAction,
  resetRoundAction, hideActorsAction, showLevelAction, increaseLevelAction, bounceGhostAction, bringGhostOutAction, GHOST_LEFT_BOX_ACTION, Action, PELLET_EATEN_ACTION, startBlueModeAction } from "../actions";

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

  const ghost1: Task = yield fork(releaseGhostSaga, 0, 0);
  const ghost2: Task = yield fork(bounceGhostSaga, 2, 0)
  const ghost3: Task = yield fork(bounceGhostSaga, 1, 2000);
  const ghost4: Task = yield fork(bounceGhostSaga, 3, 3000);

  yield put(releasePacmanAction());

  let heatComplete = false;
  let lost: boolean = false;
  //let blueModeTimer: Task;


  while (!heatComplete) {
    const result = yield take([HEAT_END_ACTION, PELLET_EATEN_ACTION]);
    switch (result.type) {
    case HEAT_END_ACTION:
      lost = result.payload;
      heatComplete = true;
      break;
    case PELLET_EATEN_ACTION:
      yield put(startBlueModeAction());
      //blueModeTimer = yield fork(delay);  
      break;
    }
  }

  yield cancel(ghost1);
  yield cancel(ghost2);
  yield cancel(ghost3);
  yield cancel(ghost4);

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