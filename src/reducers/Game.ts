import { Action, PAUSE_COMMAND_ACTION, MODAL_TEXT_ACTION } from '../actions';
import { Store } from '../model';
import * as iassign from 'immutable-assign';
import { GameEvent, DOT_EATEN_EVENT, PELLET_EATEN_EVENT, GHOST_BITTEN_EVENT } from "./Events";


export function gameReducer(state: Store.Game, action: Action, events: GameEvent[]): Store.Game {

  let result = state;

  switch (action.type) {
    case PAUSE_COMMAND_ACTION:
      result = iassign(result, (r: Store.Game) => { r.paused = !r.paused; return r; });
      break;
    case MODAL_TEXT_ACTION:
      result = iassign(result, (r: Store.Game) => { r.modalText = action.text; return r; });
      break;
  }

  // process events
  for (const ev of events) {
    switch (ev.type) {
      case DOT_EATEN_EVENT:
        result = iassign(result, (r: Store.Game) => { r.score += 10; return r; });
        break;

      case PELLET_EATEN_EVENT:
        result = iassign(result, (r: Store.Game) => { r.score += 50; return r; });
        break;

      case GHOST_BITTEN_EVENT:
        result = iassign(result, (r: Store.Game) => {
          if (r.lives > 0)
            r.lives--;
          return r;
        });
        break;

    default:
    }
  }

  return result;
}
