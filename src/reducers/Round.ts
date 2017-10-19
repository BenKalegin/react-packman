import { Store } from '../model';
import { Action, DOT_EATEN_ACTION, PELLET_EATEN_ACTION, heatEndAction, RESET_ROUND_ACTION } from '../actions';
import * as iassign from 'immutable-assign';

export function roundReducer(state: Store.Round, action: Action, heat: Store.Heat, events: Action[]): Store.Round {

  let result = state;
  
  const checkRoundComplete = () => {
    if (result.dots.every(d => d.collected) && result.pellets.every(p => p.collected)) {
      events.push(heatEndAction(false));
    }
  }

  switch (action.type) {
    case RESET_ROUND_ACTION:
      return Store.defaultApp().round;

    case DOT_EATEN_ACTION:
      let dots = result.dots;
      dots[action.index] = iassign(dots[action.index],
        l => {
          l.collected = true;
          return l;
        });
      result = iassign(result, r => { r.dots = [...dots]; return r;});
      checkRoundComplete();
      break;

    case PELLET_EATEN_ACTION:
      let pellets = result.pellets;
      pellets[action.index] = iassign(pellets[action.index],
        l => {
          l.collected = true;
          return l;
        });
      result = iassign(result, r => { r.pellets = [...pellets]; return r; });
      checkRoundComplete();
      break;
  }
  return result;
}