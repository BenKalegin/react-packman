import { Action, ANIMATION_STEP_ACTION, CHANGE_DIRECTION_ACTION } from "../actions";
import { Store } from "../model";
import { IMazePath } from "../model/derivatives";
import { Point, Direction } from "../geometry";

export function pacmanReducer(state: Store.Pacman = Store.initial().pacman, action: Action, mazePath: IMazePath): Store.Pacman {
  switch (action.type) {
  case ANIMATION_STEP_ACTION:
    const tick: number = action.tick;
    let result = {
      ...state,
      position: state.position,
      mouthAngle: state.mouthAngle
    };

    if (state.eatAnimation) {
      const eatAnimationSpan = 10;
      let angle = 90 * Math.abs(tick % eatAnimationSpan - eatAnimationSpan / 2) / (eatAnimationSpan / 2);
      // prevent flicking when angle reaches 0
      if (angle <= 0)
        angle = 0.1;
      result.mouthAngle = angle;
    }

    if (state.moving) {
      let newPos = state.position.offset(Point.vector(state.direction).scale(state.speed)).round(10);
      const bumped = (state.direction === Direction.Right || state.direction === Direction.Down) && !mazePath.hasNeighbour(newPos, state.direction) ||
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
    if (!mazePath.hasNeighbour(exactPos, action.direction))
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

export function mazeReducer(state: Store.Maze = Store.initial().maze, action: Action): Store.Maze {
  switch (action.type) {
  default:
    return state;
  }
}