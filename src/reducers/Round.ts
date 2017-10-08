import { Store } from '../model';
import { Action } from "../actions/index";
import { GameEvent, DOT_EATEN_EVENT, PELLET_EATEN_EVENT, roundCompletedEvent} from "./Events";
import * as iassign from 'immutable-assign';

export function roundReducer(state: Store.Round, action: Action, heat: Store.Heat, events: GameEvent[]): Store.Round {

  let result = state;

  for (const ev of events) {
    switch (ev.type) {
      case DOT_EATEN_EVENT:
        let dots = result.dots;
        dots[ev.index] = iassign(dots[ev.index], l => { l.collected = true; return l; });
        result = iassign(result, (r: Store.Round) => { r.dots = [...dots]; return r; });
        if (result.dots.every(d => d.collected) && result.pellets.every(p => p.collected)) {
          events.push(roundCompletedEvent());
          return Store.defaultApp().round;
        }
        break;

      case PELLET_EATEN_EVENT:
        let pellets = result.pellets;
        pellets[ev.index] = iassign(pellets[ev.index], l => { l.collected = true; return l; });
        result = iassign(result, (r: Store.Round) => { r.pellets = [...pellets]; return r; });
          if (result.dots.every(d => d.collected) && result.pellets.every(p => p.collected)) {
            events.push(roundCompletedEvent());
            return Store.defaultApp().round;
          }
        break;
      }
  }
  return result;

}
