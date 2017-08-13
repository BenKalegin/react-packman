import { initializeMaze, defaultMaze } from './mazeDefinition';
import { Direction, Point } from '../geometry';

export enum CellKind {
  Impassable,
  Noscore,
  Score,
  Gate,
  GhostsOnly,
  Fruit,
  Pacman
};

export namespace Store {

  export type Pacman = {
    eatAnimation: boolean,
    mouthAngle: number,
    direction: Direction,
    position: Point;
  };

  export type Wall = {
    points: Point[];
  };

  export type Pass = {
    kind: CellKind;
    gridPos: Point;
  };

  export type Maze = {
    borderWidth: number;
    cellSize: Point;
    passes: Pass[];
    walls: Wall[];
    gridSize: Point;
    gridOffset: Point;
  };

  export type All = {
    pacman: Pacman,
    maze: Maze;
  };
  export function initial(): All {
    const def = initializeMaze(defaultMaze());
    const borderWidth = 8;
    const cellSize = new Point(32, 32);
    const gridSize = new Point(26, 29);

    const pacman: Pacman = {
      eatAnimation: false,
      mouthAngle: 90,
      direction: Direction.Right,
      position: def.pacmanInitPos
    };
    const maze: Maze = {
      cellSize: cellSize,
      borderWidth: borderWidth,
      passes: def.passes,
      walls: def.walls,
      gridSize: gridSize,
      gridOffset: new Point(borderWidth/2, borderWidth / 2)

  };
    return {
      pacman: pacman,
      maze: maze
    }
  }
}