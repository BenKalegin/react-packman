import { Action, PAUSE_COMMAND_ACTION } from "../actions";
import { Store } from "../model";

export function gameReducer(state: Store.Game = Store.initial().game, action: Action): Store.Game {
  switch (action.type) {
    case PAUSE_COMMAND_ACTION:
      return {paused: !state.paused}
    default:
      return state;
  }
}
