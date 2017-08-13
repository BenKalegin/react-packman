import { Action, ANIMATION_STEP_ACTION, CHANGE_DIRECTION_ACTION } from "../actions";
import { Store } from "../model";


export function pacmanReducer(state: Store.Pacman = Store.initial().pacman, action: Action): Store.Pacman {
  switch (action.type) {
  case ANIMATION_STEP_ACTION:
    const tick: number = action.tick;
    let result = {
      ...state,
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
    return result;

  case CHANGE_DIRECTION_ACTION:
      // todo make some tolerance here
      return {
      ...state,
      direction: action.direction
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