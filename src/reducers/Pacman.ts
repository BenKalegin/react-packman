import { Action, ANIMATION_STEP_ACTION, CHANGE_DIRECTION_ACTION } from "../actions";
import { Store } from '../model';
import { IMazeNavigator } from '../model/MazeNavigator';
import { Direction } from "../geometry";
import { dotEatenEvent, pelletEatenEvent } from './Events';
import { PacmanAnimator } from '../domain/pacmanAnimator';
import { GameEvent } from "./Events";
import { createCollisionDetector } from '../model/CollisionDetector';

export function pacmanReducer(state: Store.Pacman, action: Action, dots: Store.Loot[], pellets: Store.Loot[], mazePath: IMazeNavigator, events: GameEvent[]): Store.Pacman {
  switch (action.type) {
  case ANIMATION_STEP_ACTION:
    let result = {
      ...state
    };

    PacmanAnimator.step(result, action.timestamp, action.period, mazePath);

    const collisionDetector = createCollisionDetector();

    const dotLooted = collisionDetector.checkLoot(state.position, dots);
    if (dotLooted !== null)
      events.push(dotEatenEvent(dotLooted));

    const pelletLooted = collisionDetector.checkLoot(state.position, pellets);
    if (pelletLooted !== null)
      events.push(pelletEatenEvent(pelletLooted));

    return result;

  case CHANGE_DIRECTION_ACTION:
    // ignore if key matches current direction
    if (action.direction === state.direction && state.moving === true)
      return {
        ...state,
        nextDirection: Direction.None
      }

    // perform immediate turn if avaialble
    const exactPos = state.position.round(1);
    if ((exactPos.equals(state.position) || !state.moving) && mazePath.hasNeighbour(exactPos, action.direction, true)) {
      const direction = action.direction;
      return {
        ...state,
        direction: direction,
        position: exactPos,
        nextDirection: Direction.None,
        moving: direction != Direction.None
      };
    }

    // 
    return { ...state, nextDirection: action.direction  }


  default:
    return state;
  }
}

