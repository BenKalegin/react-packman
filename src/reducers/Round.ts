import { Store } from '../model';
import { Action, ANIMATION_STEP_ACTION } from "../actions/index";
import { createCollisionDetector } from "../model/CollisionDetector";
import { dotEatenEvent, GameEvent, pelletEatenEvent } from "./Events";

export function roundReducer(state: Store.Round, action: Action, heat: Store.Heat, events: GameEvent[]): Store.Round {
  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      let { dots, pellets } = state;
      const collisionDetector = createCollisionDetector();
      console.log(heat.pacman.position);
      if (collisionDetector.tryLoot(heat.pacman.position, dots)) {
        dots = [...dots];
        events.push(dotEatenEvent(heat.pacman.position.round(1)));
      } else if (collisionDetector.tryLoot(heat.pacman.position, pellets)) {
        pellets = [...pellets];
        events.push(pelletEatenEvent(heat.pacman.position.round(1)));
      }

      return {
      ...state,
      dots: dots,
      pellets: pellets
    }

  default:
    return state;
  }
}
