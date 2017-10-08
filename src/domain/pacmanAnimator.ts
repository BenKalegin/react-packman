import { Store } from '../model/index';
import { Point, Direction } from '../geometry';
import { IMazeNavigator } from '../model/MazeNavigator';

export class PacmanAnimator {

  public static step(state: Store.Pacman, timestamp: number, period: number, mazePath: IMazeNavigator) {

    if (state.eatAnimation)
      PacmanAnimator.chomp(state, timestamp);

    if (state.moving)
      PacmanAnimator.move(state, period, mazePath);
  }

  private static chomp(state: Store.Pacman, timestamp: number) : void {
    const chompMillis = 200;
    const ms = timestamp % chompMillis;
    let angle = Math.round(90 * Math.abs(ms - chompMillis / 2) / (chompMillis / 2));
    // prevent flicking when angle reaches 0
    if (angle <= 0)
      angle = 0.1;
    state.mouthAngle = angle;    
  }

  private static move(state: Store.Pacman, period: number, mazePath: IMazeNavigator): void {
    const delta = state.speed / 1000 * period;
    let newPos = state.position.offset(Point.vector(state.direction).scale(delta)).round(10);

    // check if need to turn because of preliminary arrow key press
    if (newPos.equals(newPos.round(1)) &&
      state.nextDirection !== Direction.None &&
      mazePath.hasNeighbour(newPos, state.nextDirection, true)) {
      state.direction = state.nextDirection;
      state.nextDirection = Direction.None;
      state.position = newPos;
      return;
    }

    const bumped = (state.direction === Direction.Right || state.direction === Direction.Down) &&
      !mazePath.hasNeighbour(newPos, state.direction, true) ||
      (state.direction === Direction.Left || state.direction === Direction.Up) && !mazePath.canEnter(newPos);
    if (bumped) {
      newPos = newPos.round(1);
      state.moving = false;
    }

    state.position = newPos;
  }
}