import { Store } from './index';
import { Direction, Point } from '../geometry';

class Cell {
  ghostsOnly: boolean;
  neighbours = new Map<Direction, Cell>();  
  public constructor(ghostOnly: boolean) {
    this.ghostsOnly = ghostOnly;
  }
}

export interface IMazeNavigator {
  hasNeighbour(point: Point, direction: Direction, pacman: boolean): boolean;    
  canEnter(point: Point): boolean;
  canGhostBounceUp(point: Point): boolean;
  isGhostOutOfTheBox(point: Point): boolean;
  directionTowardsGate(point: Point): Direction;
};

export const createMazeNavigator = (model: Store.Maze): IMazeNavigator => new MazeNavigator(model);

export class MazeNavigator implements IMazeNavigator {
  private static hashFactor = 1000;
  private cells = new Map<number, Cell>();
  private gate: Point;

  private coordinateToCell(xOrY: number) : number {
    return Math.floor(Math.round(xOrY * 1000) / 1000)
  }

  private sparseHash(point: Point): number {
    return this.coordinateToCell(point.y) * MazeNavigator.hashFactor + this.coordinateToCell(point.x);
  }

  constructor(model: Store.Maze) {
    model.passes.forEach(p => this.cells.set(this.sparseHash(p.gridPos), new Cell(p.ghostOnly)));
    this.gate = model.gate;

    this.cells.forEach((cell, hash, map) => {
        const setNeighbour = (direction: Direction, hashDelta: number) => {
        const neighbour = this.cells.get(hash + hashDelta);
        if (neighbour)
          cell.neighbours.set(direction, neighbour);
        
      }

      setNeighbour(Direction.Left, -1);
      setNeighbour(Direction.Right, 1);
      setNeighbour(Direction.Up, -MazeNavigator.hashFactor);
      setNeighbour(Direction.Down, MazeNavigator.hashFactor);
    });
  }

  hasNeighbour(point: Point, direction: Direction, pacman: boolean): boolean {
    const hash = this.sparseHash(point);
    const cell = this.cells.get(hash);
    if (cell != null) {
      const neighbour = cell.neighbours.get(direction);
      return neighbour != null && (!neighbour.ghostsOnly || !pacman);
    }
    return false;
  }

  canEnter(point: Point): boolean {
    const hash = this.sparseHash(point);
    const cell = this.cells.get(hash);
    return cell != null && !cell.ghostsOnly;
  }

  canGhostBounceUp(point: Point): boolean {
    return this.coordinateToCell(point.y) > this.gate.y + 1;
  }

  isGhostOutOfTheBox(point: Point): boolean {
    return this.coordinateToCell(point.y) <= this.gate.y;
  };

  directionTowardsGate(point: Point): Direction {
    const cellX = this.coordinateToCell(point.x);
    if (cellX <= this.gate.x)
      return Direction.Right;
    else if (cellX > this.gate.x + 1)
      return Direction.Left;
    else
      return Direction.Up;
  }
}