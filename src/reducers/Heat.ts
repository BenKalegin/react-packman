import { Store } from "../model";
import { Action } from "../actions";
import { GameEvent , GHOST_BITTEN_EVENT} from "./Events";
import * as iassign from 'immutable-assign';

export function heatReducer(state: Store.Heat, action: Action, pacman: Store.Pacman, ghosts: Store.Ghost[], events: GameEvent[]): Store.Heat {

  let result = state;

  for (const ev of events) {
    switch (ev.type) {
      case GHOST_BITTEN_EVENT:
        return Store.defaultApp().heat;      
    }
  }

  result = iassign(result, (r: Store.Heat) => {
    r.ghosts = ghosts;
    r.pacman = pacman;
    return r;
  });

  return result;
}
