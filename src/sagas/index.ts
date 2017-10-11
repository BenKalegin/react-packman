import { takeEvery } from 'redux-saga/effects';
import { startApplicationSaga, introduceHeatSaga } from "./startRoundSaga";
import { START_APPLICATION_ACTION, INTRO_HEAT_ACTION } from "../actions";

export function* rootSaga() {
  yield [
    takeEvery(START_APPLICATION_ACTION, startApplicationSaga),
    takeEvery(INTRO_HEAT_ACTION, introduceHeatSaga)
  ];
}