import { Action, ANIMATION_STEP_ACTION, RELEASE_GHOST_ACTION, FREEZE_ACTORS_ACTION, ghostBittenAction, HIDE_ACTORS_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, allDirections, revertDirection, Direction } from '../geometry';
import { createCollisionDetector } from "../model/CollisionDetector";
import { Mutator } from "./Mutator";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

class MutableGhost implements Store.Ghost {
  moving: boolean;
  hidden: boolean;
  direction: Direction;
  speed: number;
  position: Point;
}

class GhostMutator extends Mutator<Store.Ghost, MutableGhost> {
  public advance(period: number): void {
    const ghostPositionRounding = 10;
    const delta = this.mutable.speed / 1000 * period;
    const offset = Point.vector(this.mutable.direction).scale(delta);
    this.mutable.position = this.mutable.position.offset(offset).round(ghostPositionRounding);
  }

  public startMoving(): void {
    this.mutable.moving = true;
  }

  public stopMoving(): void {
    this.mutable.moving = false;
  }

  public hide(): void {
    this.mutable.hidden = true;
  }

  public changeDirection(direction: Direction): void {
    this.mutable.direction = direction;
  }
}

export function ghostReducer(states: Store.Ghost[], action: Action, pacman: Store.Pacman, mazeNavigator: IMazeNavigator, events: Action[]): Store.Ghost[] {

  let ghosts = states.map(s => new GhostMutator(s));

  switch (action.type) {
    case ANIMATION_STEP_ACTION:
      const collisionDetector = createCollisionDetector();
      let biteEventPosted = false;
      ghosts.forEach((ghost, index) => {

        if (ghost.state.moving) {
          if (ghost.state.position.equals(ghost.state.position.round(1))) {
            const possibleDirections = allDirections.filter(d => d != revertDirection(ghost.state.direction) &&
                mazeNavigator.hasNeighbour(ghost.state.position, d, false));
            if (possibleDirections.length === 1)
              ghost.changeDirection(possibleDirections[0]);
            else
              ghost.changeDirection(possibleDirections[getRandomInt(possibleDirections.length)]);
          }
          ghost.advance(action.period);
          if (!biteEventPosted && collisionDetector.checkBite(pacman.position, ghost.state.position)) {
            events.push(ghostBittenAction(pacman.position, index));
            biteEventPosted = true;
          }
        }
      });
      break;

    case RELEASE_GHOST_ACTION:
      ghosts[action.index].startMoving();
      break;

    case FREEZE_ACTORS_ACTION:
      ghosts.forEach(ghost => ghost.stopMoving());
      break;

    case HIDE_ACTORS_ACTION:
      ghosts.forEach(ghost => ghost.hide());
      break;
  }
  return ghosts.map(m => m.state);
}
