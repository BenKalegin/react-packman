import { Action, ANIMATION_STEP_ACTION, CHANGE_DIRECTION_ACTION, RELEASE_PACMAN_ACTION, dotEatenAction, pelletEatenAction, FREEZE_ACTORS_ACTION, KILL_PACMAN_ACTION, HIDE_ACTORS_ACTION } from "../actions";
import { Store } from '../model';
import { IMazeNavigator } from '../model/MazeNavigator';
import { Direction } from "../geometry";
import { PacmanAnimator } from '../domain/pacmanAnimator';
import { createCollisionDetector } from '../model/CollisionDetector';

export function pacmanReducer(state: Store.Pacman, action: Action, dots: Store.Loot[], pellets: Store.Loot[], mazePath: IMazeNavigator, events: Action[]): Store.Pacman {

  switch (action.type) {
  case ANIMATION_STEP_ACTION:

    state = PacmanAnimator.step(state, action.timestamp, action.period, mazePath);

    const collisionDetector = createCollisionDetector();

    const dotLooted = collisionDetector.checkLoot(state.position, dots);
    if (dotLooted !== null)
      events.push(dotEatenAction(dotLooted));

    const pelletLooted = collisionDetector.checkLoot(state.position, pellets);
    if (pelletLooted !== null)
      events.push(pelletEatenAction(pelletLooted));

    return state;

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


  case RELEASE_PACMAN_ACTION:
    return { ...state, moving: true, chomping: true }

  case FREEZE_ACTORS_ACTION:
    return { ...state, moving: false, chomping: false }

  case HIDE_ACTORS_ACTION:
    return { ...state, hidden: true }

  case KILL_PACMAN_ACTION:
    return { ...state, dying: true, chomping: false }


  default:
    return state;
  }
}

