import { Store } from "./index";
import { Direction, Point } from "../geometry";
import { CellKind } from '.';

class Cell {
  ghostsOnly: boolean;
  neighbours = new Map<Direction, Cell>();  
  public constructor(kind :CellKind) {
    this.ghostsOnly = kind === CellKind.GhostsOnly || kind === CellKind.Gate;
  }
}

export interface IMazeNavigator {
  hasNeighbour(point: Point, direction: Direction, pacman: boolean) : boolean;    
  canEnter(point: Point): boolean;    
};

export const createMazeNavigator = (model: Store.Maze): IMazeNavigator => new MazeNavigator(model);

export class MazeNavigator implements IMazeNavigator {
  private static hashFactor = 1000;
  private cells = new Map<number, Cell>();

  private sparseHash(point: Point) : number {
    return Math.floor(Math.round(point.y * 1000) / 1000) * MazeNavigator.hashFactor + Math.floor(Math.round(point.x * 1000) / 1000);
  }

  constructor(model: Store.Maze) {
    model.passes.forEach(p => this.cells.set(this.sparseHash(p.gridPos), new Cell(p.kind)));

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
}