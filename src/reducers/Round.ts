import { Store } from '../model';
import { Action, ANIMATION_STEP_ACTION } from "../actions/index";
import { createCollisionDetector } from "../model/CollisionDetector";
import { dotEatenEvent, GameEvent, pelletEatenEvent} from "./Events";
import * as iassign from 'immutable-assign';

export function roundReducer(state: Store.Round, action: Action, heat: Store.Heat, events: GameEvent[]): Store.Round {

  let result = state;

  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      let { dots, pellets } = state;
      const collisionDetector = createCollisionDetector();
      if (collisionDetector.tryLoot(heat.pacman.position, dots)) {
        result = iassign(result, (r: Store.Round) => { r.dots = [...dots]; return r; });
        events.push(dotEatenEvent(heat.pacman.position.round(1)));
      } else if (collisionDetector.tryLoot(heat.pacman.position, pellets)) {
        result = iassign(result, (r: Store.Round) => { pellets = [...pellets]; return r; });
        events.push(pelletEatenEvent(heat.pacman.position.round(1)));
      }
  }

  return result;

}
