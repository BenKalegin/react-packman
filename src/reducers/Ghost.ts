import { Action, ANIMATION_STEP_ACTION, RELEASE_GHOST_ACTION, FREEZE_ACTORS_ACTION, ghostBittenAction, HIDE_ACTORS_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, allDirections, revertDirection } from '../geometry';
import { createCollisionDetector } from "../model/CollisionDetector";
import * as iassign from 'immutable-assign';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function ghostReducer(states: Store.Ghost[], action: Action, pacman: Store.Pacman, mazeNavigator: IMazeNavigator, events: Action[]): Store.Ghost[] {
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
          if (collisionDetector.checkBite(pacman.position, result.position)) {
            events.push(ghostBittenAction(pacman.position.round(10), states.indexOf(state)));
          }
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
      break;

    case FREEZE_ACTORS_ACTION:
      states = states.map(state => iassign(state, 
        g => {
          g.moving = false;
          return g;
        }));
      break;

    case HIDE_ACTORS_ACTION:
      states = states.map(state => iassign(state, 
        g => {
          g.hidden = true;
          return g;
        }));
      break;
  }
  return states;
}
