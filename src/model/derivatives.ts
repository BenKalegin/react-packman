import { Store } from "./index";
import { Direction, Point } from "../geometry";

class Cell {
  neighbours = new Map<Direction, Cell>();  
}

export interface IMazePath {
  hasNeighbour(point: Point, direction: Direction) : boolean;    
  canEnter(point: Point): boolean;    
};

export const createMazePath = (model: Store.Maze): IMazePath => new MazePath(model);

export class MazePath implements IMazePath {
  private static hashFactor = 1000;
  private cells = new Map<number, Cell>();

  private sparseHash(point: Point) : number {
    return Math.floor(Math.round(point.y * 1000) / 1000) * MazePath.hashFactor + Math.floor(Math.round(point.x * 1000) / 1000);
  }

  constructor(model: Store.Maze) {
    model.passes
      .map(p => this.sparseHash(p.gridPos))
      .forEach(p => this.cells.set(p, new Cell()));

    this.cells.forEach((cell, hash, map) => {
        const setNeighbour = (direction: Direction, hashDelta: number) => {
        const neighbour = this.cells.get(hash + hashDelta);
        if (neighbour)
          cell.neighbours.set(direction, neighbour);
        
      }

      setNeighbour(Direction.Left, -1);
      setNeighbour(Direction.Right, 1);
      setNeighbour(Direction.Up, -MazePath.hashFactor);
      setNeighbour(Direction.Down, MazePath.hashFactor);
    });
  }

  hasNeighbour(point: Point, direction: Direction): boolean {
    const hash = this.sparseHash(point);
    const cell = this.cells.get(hash);
    return cell != null && cell.neighbours.get(direction) != null;
  }

  canEnter(point: Point): boolean {
    const hash = this.sparseHash(point);
    return this.cells.get(hash) != null;
  }

}