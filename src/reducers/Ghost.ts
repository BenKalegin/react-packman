import { Action, ANIMATION_STEP_ACTION, RELEASE_GHOST_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, allDirections, revertDirection } from '../geometry';
import { createCollisionDetector } from "../model/CollisionDetector";
import { ghostBittenEvent, GameEvent} from "./Events";
import * as iassign from 'immutable-assign';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function ghostReducer(states: Store.Ghost[], action: Action, pacman: Store.Pacman, mazeNavigator: IMazeNavigator, events: GameEvent[]): Store.Ghost[] {
  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      let results = new Array<Store.Ghost>();
      const collisionDetector = createCollisionDetector();
      for (let state of states) {

        let result = state;

        if (state.moving) {
          if (state.position.equals(state.position.round(1))) {
            const possibleDirections =
              allDirections.filter(d => d != revertDirection(result.direction) && mazeNavigator.hasNeighbour(state.position, d, false));
            result = iassign(result, (g: Store.Ghost) => { g.direction = possibleDirections[getRandomInt(possibleDirections.length)]; return g; });
          }
          const delta = state.speed / 1000 * (action.period);
          result = iassign(result, (g: Store.Ghost) => { g.position = state.position.offset(Point.vector(result.direction).scale(delta)).round(10); return g; });
        }
        if (collisionDetector.checkBite(pacman.position, result.position)) {
          events.push(ghostBittenEvent(pacman.position.round(10), states.indexOf(state)));
          break;
        }
        results.push(result);
      }
      return results;

    case RELEASE_GHOST_ACTION:
      states[action.index] = iassign(states[action.index], 
        g => {
          g.moving = true;
          return g;
        });

      return states;

    default:
      return states;
  }
}
