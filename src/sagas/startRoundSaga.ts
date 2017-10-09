import { take } from 'redux-saga/effects';
import { START_ROUND_ACTION } from "../actions";

export function* startRoundSaga() {
  yield take(START_ROUND_ACTION);
  //yield fork(fetchUser);
}