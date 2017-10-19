import { Store } from "../model";
import { Action, RESET_HEAT_ACTION, RESET_ROUND_ACTION } from "../actions";
import * as iassign from 'immutable-assign';

export function heatReducer(state: Store.Heat, action: Action, pacman: Store.Pacman, ghosts: Store.Ghost[], events: Action[]): Store.Heat {

  let result = state;

  result = iassign(result, (r: Store.Heat) => {
    r.ghosts = ghosts;
    r.pacman = pacman;
    return r;
  });

  switch(action.type) {
    case RESET_HEAT_ACTION:
    case RESET_ROUND_ACTION:
      return Store.defaultApp().heat;
  } 

  return result;
}
