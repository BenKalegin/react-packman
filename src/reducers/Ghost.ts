import { Action, ANIMATION_STEP_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, allDirections, revertDirection } from '../geometry';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function ghostReducer(states: Store.Ghost[], action: Action, mazeNavigator: IMazeNavigator): Store.Ghost[] {
  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      let results = new Array<Store.Ghost>(states.length);

      for (let i in states) {

        const state = states[i];

        let result = {
          ...state,
          position: state.position,
          direction: state.direction
        };

        if (state.moving) {
          if (state.position.equals(state.position.round(1))) {
            const possibleDirections =
              allDirections.filter(d => d != revertDirection(result.direction) && mazeNavigator.hasNeighbour(state.position, d, false));
            result.direction = possibleDirections[getRandomInt(possibleDirections.length)];
          }
          result.position = state.position.offset(Point.vector(result.direction).scale(state.speed)).round(10);
        }
        results[i] = result;
      }
      return results;

    default:
      return states;
  }
}
