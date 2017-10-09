import { startRoundSaga } from "./startRoundSaga";

export function* rootSaga() {
  yield [
    startRoundSaga()
  ]
}