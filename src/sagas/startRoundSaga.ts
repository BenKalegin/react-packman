import { put, fork, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { modalTextAction, releasePacmanAction, releaseGhostAction, startHeatAction, GHOST_BITTEN_ACTION} from "../actions";

export function* startApplicationSaga() {
  yield put(startHeatAction());
}

export function* releaseGhostSaga(index: number, msdelay: number) {
  yield delay(msdelay);
  yield put(releaseGhostAction(index));
}

export function* introduceHeatSaga() {
  yield put(modalTextAction("GET READY!"));
  yield delay(2000);
  yield put(modalTextAction(undefined));

  yield fork(releaseGhostSaga, 0, 0);		
  yield fork(releaseGhostSaga, 1, 0);		
  yield fork(releaseGhostSaga, 2, 2000);		
  yield fork(releaseGhostSaga, 3, 3000);		

  yield put(releasePacmanAction());

  yield take(GHOST_BITTEN_ACTION);
  //yield put(freezeActorsAction());
}