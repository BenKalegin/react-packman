import { Action, PAUSE_COMMAND_ACTION } from '../actions';
import { Store } from '../model';
import * as iassign from 'immutable-assign';
import { GameEvent, DOT_EATEN_EVENT } from "./Events";


export function gameReducer(state: Store.Game, action: Action, events: GameEvent[]): Store.Game {

  let result = state;
  function update (proc: (game: Store.Game) => void) {
    result = iassign(result, (r: Store.Game) => { proc(result); return r; });
  }

  switch (action.type) {
    case PAUSE_COMMAND_ACTION:
      update(r => { r.paused = !state.paused });
  }

  // process events
  for (const ev of events) {
    switch (ev.type) {
      case DOT_EATEN_EVENT:
        update(r => { r.score += 10; });
      
    default:
    }
  }

  return result;
}
