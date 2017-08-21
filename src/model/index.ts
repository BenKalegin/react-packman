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
    moving: boolean,
    mouthAngle: number,
    direction: Direction,
    speed: number,
    position: Point;
  };

  export type Ghost = {
    moving: boolean,
    direction: Direction,
    speed: number,
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

  export type Game = {
    maze: Maze;
    score: number;
    paused: boolean;
  }

  export type Round = {
    dots: Point[];
    pellets: Point[];
  }

  export type Heat = {
    pacman: Pacman,
    ghosts: Ghost[],
  }

  export type All = {
    game: Game,
    round: Round,
    heat: Heat
  };

  export function initial(): All {
    const def = initializeMaze(defaultMaze());
    const borderWidth = 8;
    const cellSize = new Point(30, 30);
    const gridSize = new Point(26, 29);

    const maze: Maze = {
      cellSize: cellSize,
      borderWidth: borderWidth,
      passes: def.passes,
      walls: def.walls,
      gridSize: gridSize,
      gridOffset: new Point(borderWidth / 2, borderWidth / 2)
    };

    const game: Game = {
      maze: maze,
      paused: false,
      score: 0
    }

    const dots = def.passes.filter(c => c.kind === CellKind.Score).map(c => c.gridPos);
    const pellets = def.passes.filter(c => c.kind === CellKind.Fruit).map(c => c.gridPos);



    const round: Round = {
      dots: dots,
      pellets: pellets  
    }


    const pacman: Pacman = {
      eatAnimation: true,
      mouthAngle: 90,
      direction: Direction.Right,
      position: def.pacmanInitPos,
      moving: false,
      speed: 0.2
    };

    const ghosts = [0, 1, 2, 3].map(i => {
      return {
        moving: true,
        direction: Direction.None,
        speed: 0.2,
        position: def.ghostInitPos[i]
      }
    });

    const heat: Heat = {
      pacman: pacman,
      ghosts: ghosts,
    }

    return {
      game: game,
      round: round,
      heat: heat
    }
  }
}