import { Store } from '../model/index';
import { Point, Direction } from '../geometry';
import { IMazeNavigator } from '../model/MazeNavigator';
import * as iassign from 'immutable-assign';

export class PacmanAnimator {

  public static step(state: Store.Pacman, timestamp: number, period: number, mazePath: IMazeNavigator): Store.Pacman  {

    if (state.chomping)
      state = PacmanAnimator.chomp(state, timestamp);

    if (state.moving)
      state = PacmanAnimator.move(state, period, mazePath);

    if (state.dying)
      state = PacmanAnimator.die(state, timestamp);

    return state;
  }

  private static chomp(state: Store.Pacman, timestamp: number): Store.Pacman {
    const chompMillis = 200;
    const ms = timestamp % chompMillis;
    let angle = Math.round(90 * Math.abs(ms - chompMillis / 2) / (chompMillis / 2));
    // prevent flicking when angle reaches 0
    if (angle <= 0)
      angle = 0.1;
    return iassign(state,
      (s: Store.Pacman) => {
        s.mouthAngle = angle;
        return s;
      });
  }

  private static die(state: Store.Pacman, timestamp: number): Store.Pacman {
    let angle = state.mouthAngle == 0 ? 0 : state.mouthAngle + 3;
    return iassign(state, s => {
      if (angle < 360)
        s.mouthAngle = angle;
      else
        s.mouthAngle = 0
      return s;
    });
  }

  private static move(state: Store.Pacman, period: number, mazePath: IMazeNavigator): Store.Pacman {
    const delta = state.speed / 1000 * period;
    let newPos = state.position.offset(Point.vector(state.direction).scale(delta)).round(10);

    // check if need to turn because of preliminary arrow key press
    if (newPos.equals(newPos.round(1)) &&
      state.nextDirection !== Direction.None &&
      mazePath.hasNeighbour(newPos, state.nextDirection, true)) {
      state = iassign(state,
        (s: Store.Pacman) => {
          s.direction = state.nextDirection;
          s.nextDirection = Direction.None;
          s.position = newPos;
          return s;
        });
      return state;
    }

    const bumped = (state.direction === Direction.Right || state.direction === Direction.Down) &&
      !mazePath.hasNeighbour(newPos, state.direction, true) ||
      (state.direction === Direction.Left || state.direction === Direction.Up) && !mazePath.canEnter(newPos);
    if (bumped) {
      newPos = newPos.round(1);
      state = iassign(state,
        (s: Store.Pacman) => {
          state.moving = false;
          return s;
        });
    }

    state = iassign(state,
      (s: Store.Pacman) => {
        s.position = newPos;
        return s;
      });
    return state;
  }
}