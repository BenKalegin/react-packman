import { Store } from '../model';
import { Action, ANIMATION_STEP_ACTION } from "../actions/index";
import { createCollisionDetector } from "../model/CollisionDetector";

export function roundReducer(state: Store.Round, action: Action, heat: Store.Heat): Store.Round {
  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      let { dots, pellets } = state;
      const collisionDetector = createCollisionDetector();
      console.log(heat.pacman.position);
      if (collisionDetector.tryLoot(heat.pacman.position, dots)) {
        dots = [...dots];
      } else if (collisionDetector.tryLoot(heat.pacman.position, pellets)){
        pellets = [...pellets]  
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
