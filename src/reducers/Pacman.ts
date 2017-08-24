import { Action, ANIMATION_STEP_ACTION, CHANGE_DIRECTION_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, Direction } from "../geometry";

export function pacmanReducer(state: Store.Pacman, action: Action, mazePath: IMazeNavigator ): Store.Pacman {
  switch (action.type) {
  case ANIMATION_STEP_ACTION:
    const timestamp: number = action.timestamp;
    let result = {
      ...state,
      position: state.position,
      mouthAngle: state.mouthAngle
    };

    if (state.eatAnimation) {
      const chompMillis = 200;
      const ms = timestamp % chompMillis;
      let angle = Math.round(90 * Math.abs(ms - chompMillis / 2) / (chompMillis / 2));
      // prevent flicking when angle reaches 0
      if (angle <= 0)
        angle = 0.1;
      result.mouthAngle = angle;
    }

    if (state.moving) {
      const delta = state.speed / 1000 * (action.period);
      let newPos = state.position.offset(Point.vector(state.direction).scale(delta)).round(10);
      const bumped = (state.direction === Direction.Right || state.direction === Direction.Down) && !mazePath.hasNeighbour(newPos, state.direction, true) ||
        (state.direction === Direction.Left || state.direction === Direction.Up) && !mazePath.canEnter(newPos);
      if (bumped) {
        result.moving = false;
        newPos = newPos.round(1);
      }
      result.position = newPos;
    }
    return result;

  case CHANGE_DIRECTION_ACTION:
    // ignore if key matches current direction
    if (action.direction === state.direction && state.moving === true)
      return state;

    // ignore movements to walls
    let exactPos = state.position.round(1);
    if (!mazePath.hasNeighbour(exactPos, action.direction, true))
      return state;

    const direction = action.direction;
    return {
      ...state,
      direction: direction,
      position: exactPos,
      moving: direction != Direction.None
    };


  default:
    return state;
  }
}

