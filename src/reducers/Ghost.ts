import { Action, ANIMATION_STEP_ACTION, RELEASE_GHOST_ACTION, FREEZE_ACTORS_ACTION, ghostBittenAction, HIDE_ACTORS_ACTION, BOUNCE_GHOST_ACTION, ghostLeftBoxAction, BRING_GHOST_OUT_ACTION, START_BLUE_MODE_ACTION, END_BLUE_MODE_ACTION } from "../actions";
import { Store } from "../model";
import { IMazeNavigator } from "../model/MazeNavigator";
import { Point, allDirections, revertDirection, Direction } from '../geometry';
import { createCollisionDetector } from "../model/CollisionDetector";
import { Mutator } from "./Mutator";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

class MutableGhost implements Store.Ghost {
  state: Store.GhostState;
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
    this.mutable.state = Store.GhostState.running;
  }

  public startBouncing(): void {
    this.mutable.state = Store.GhostState.bouncing;
    this.mutable.direction = Direction.Down;
  }

  public freeze(): void {
    this.mutable.state = Store.GhostState.frozen;
  }

  public startLeaveBox(): void {
    this.mutable.state = Store.GhostState.leavingBox;
  }

  public hide(): void {
    this.mutable.state = Store.GhostState.hidden;
  }

  public startBlueMode(pacmanPosition: Point): void {
    if (this.state.state == Store.GhostState.running)
      this.mutable.direction = revertDirection(this.mutable.direction); 
    this.mutable.state = Store.GhostState.scared;
  }

  public endBlueMode(): void {
    if (this.state.state == Store.GhostState.scared)
      this.mutable.state = Store.GhostState.running;
  }

  public coerceDirection(direction: Direction): void {
    this.mutable.direction = direction;
  }

  public decideChasingDirection(allowedDirections: Direction[], pacmanPosition: Point, ghostIndex: number, pacmanDirection: Direction, blinkyPosition: Point): void {
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

  public decideRunawayDirection(allowedDirections: Direction[], pacmanPosition: Point): void {
    let decision: number = 0;
    if (allowedDirections.length == 1)
      decision = 0;
    else {
      allowedDirections = allowedDirections.filter(d => d != revertDirection(this.state.direction));
      const distances = allowedDirections.map(d => this.mutable.position.offset(Point.vector(d)).euclidDistanceTo(pacmanPosition));
      decision = distances.reduce((closestIndex, distance, i) => distance > distances[closestIndex] ? i : closestIndex, 0);
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
        if (ghost.state.state != Store.GhostState.frozen && ghost.state.state != Store.GhostState.hidden) {
          if (ghost.state.position.equals(ghost.state.position.round(1))) {
            switch (ghost.state.state) {
              case Store.GhostState.running:
                const possibleDirections = allDirections.filter(d => mazeNavigator.hasNeighbour(ghost.state.position, d, true));
                if (possibleDirections.length === 1) {
                  if (ghost.state.direction != possibleDirections[0])
                    ghost.coerceDirection(possibleDirections[0]);
                } else
                  ghost.decideChasingDirection(possibleDirections.filter(d => d != revertDirection(ghost.state.direction)),
                    pacman.position,
                    index,
                    pacman.direction,
                    ghosts[0].state.position);
                break;

              case Store.GhostState.bouncing:
                if (!mazeNavigator.hasNeighbour(ghost.state.position, ghost.state.direction, false) ||
                  (ghost.state.direction == Direction.Up && !mazeNavigator.canGhostBounceUp(ghost.state.position)))
                  ghost.coerceDirection(revertDirection(ghost.state.direction));
                break;

              case Store.GhostState.leavingBox:
                if (mazeNavigator.isGhostOutOfTheBox(ghost.state.position))
                  events.push(ghostLeftBoxAction(index));
                else {
                  const exitDirection = mazeNavigator.directionTowardsGate(ghost.state.position);
                  if (exitDirection != ghost.state.direction)
                    ghost.coerceDirection(exitDirection);
                }
                break;
              case Store.GhostState.scared:
                ghost.decideRunawayDirection(allDirections.filter(d => mazeNavigator.hasNeighbour(ghost.state.position, d, true)), pacman.position);
                break;
            }
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

    case BRING_GHOST_OUT_ACTION:
      ghosts[action.index].startLeaveBox();
      break;

    case BOUNCE_GHOST_ACTION:
      ghosts[action.index].startBouncing();
      break;

    case FREEZE_ACTORS_ACTION:
      ghosts.forEach(ghost => ghost.freeze());
      break;

    case HIDE_ACTORS_ACTION:
      ghosts.forEach(ghost => ghost.hide());
      break;

    case START_BLUE_MODE_ACTION:
      ghosts.forEach(ghost => ghost.startBlueMode(pacman.position));
      break;

    case END_BLUE_MODE_ACTION:
      ghosts.forEach(ghost => ghost.endBlueMode());
      break;
  }
  return ghosts.map(m => m.state);
}
