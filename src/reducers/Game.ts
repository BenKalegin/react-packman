import { Action, PAUSE_COMMAND_ACTION, MODAL_TEXT_ACTION, DOT_EATEN_ACTION, GHOST_BITTEN_ACTION, PELLET_EATEN_ACTION } from '../actions';
import { Store } from '../model';
import * as iassign from 'immutable-assign';


export function gameReducer(state: Store.Game, action: Action, events: Action[]): Store.Game {

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
      case DOT_EATEN_ACTION:
        result = iassign(result, r => { r.score += 10; return r; });
        break;

      case PELLET_EATEN_ACTION:
        result = iassign(result, r => { r.score += 50; return r; });
        break;

      case GHOST_BITTEN_ACTION:
        result = iassign(result, r => { if (r.lives > 0) r.lives--; return r; });
        break;

    default:
    }
  }

  return result;
}
