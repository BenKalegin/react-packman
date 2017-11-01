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

  /**
   * turn to the only direction allowed by the maze
   */
  public coerceDirection(direction: Direction): void {
    this.mutable.direction = direction;
  }

  /**
    * Decide what direction to go based on current moving mode
    */
  public decideDirection(allowedDirections: Direction[], pacmanPosition: Point, ghostIndex: number, pacmanDirection: Direction, blinkyPosition: Point): void {
    let decision: number = 0;
    switch (ghostIndex) {
      case 0:
        decision = this.blinkyDecision(allowedDirections, pacmanPosition);
        break;
      case 1:
        decision = this.inkyDecision(allowedDirections, pacmanPosition, pacmanDirection, blinkyPosition);
        break;
      case 2:
        decision = this.pinkyDecision(allowedDirections, pacmanPosition, pacmanDirection);
        break;
      default:
        decision = getRandomInt(allowedDirections.length);
    }
    this.mutable.direction = allowedDirections[decision];
  }

  blinkyDecision(allowedDirections: Direction[], pacmanPosition: Point) : number {
    const distances = allowedDirections.map(d => this.mutable.position.offset(Point.vector(d)).euclidDistanceTo(pacmanPosition));
    return distances.reduce((closestIndex, distance, i) => distance < distances[closestIndex] ? i : closestIndex, 0);
    
  }

  pinkyDecision(allowedDirections: Direction[], pacmanPosition: Point, pacmanDirection: Direction) : number {
      const distances = allowedDirections.map(d => this.mutable.position.offset(Point.vector(d))
          .euclidDistanceTo(pacmanPosition.offset(Point.vector(pacmanDirection).scale(4))));
    return distances.reduce((closestIndex, distance, i) => distance < distances[closestIndex] ? i : closestIndex, 0);
  }

  inkyDecision(allowedDirections: Direction[], pacmanPosition: Point, pacmanDirection: Direction, blinkyPosition: Point): number {
    const twoCellsAhead = pacmanPosition.offset(Point.vector(pacmanDirection).scale(2));
    const blinkyVector = twoCellsAhead.offset(blinkyPosition.negate).scale(2).offset(blinkyPosition); 
    const distances = allowedDirections.map(d => this.mutable.position.offset(Point.vector(d))
      .euclidDistanceTo(blinkyVector));
    return distances.reduce((closestIndex, distance, i) => distance < distances[closestIndex] ? i : closestIndex, 0);
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
            const possibleDirections = allDirections.filter(d => mazeNavigator.hasNeighbour(ghost.state.position, d, false));
            if (possibleDirections.length === 1) {
              if (ghost.state.direction != possibleDirections[0])
                ghost.coerceDirection(possibleDirections[0]);
            } else
                ghost.decideDirection(possibleDirections.filter(d => d != revertDirection(ghost.state.direction)), pacman.position, index, pacman.direction, ghosts[0].state.position);
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
