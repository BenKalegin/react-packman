import { parseMazeSchema } from './mazeSchemaParser';
import { Direction, Point } from '../geometry';
import { mazeSchema1 } from './mazeSchema';

export namespace Store {

  export type Pacman = {
    chomping: boolean,
    running: boolean,
    dying: boolean,
    hidden: boolean,
    mouthAngle: number,
    direction: Direction,
    nextDirection: Direction,
    speed: number,
    position: Point
  };

  export enum GhostState {
    running = 'running',
    bouncing = 'bouncing',
    hidden = 'hidden',
    frozen = 'frozen',
    leavingBox = 'spawning',
    scared = 'scared'
  }

  export interface Ghost {
    state: GhostState;
    direction: Direction,
    speed: number,
    position: Point;
  };

  export enum WallType {
    n,
    nw,
    w,
    ne,
    sw,
    se,
    N,
    S,
    NW,
    NW2,
    W,
    E,
    NE,
    NE2,
    SW,
    SW2,
    SE,
    SE2,
    Ne,
    Nw,
    Ws,
    Wn,
    Es,
    En,
  }

  export type Wall = {
    position: Point;
    type: WallType;
  };

  export type Pass = {
    gridPos: Point;
    ghostOnly: boolean;
  };

  export type Maze = {
    cellSize: Point;
    passes: Pass[];
    walls: Wall[];
    gridSize: Point;
    textPos: Point;
    gate: Point;
  };

  export type Game = {
    maze: Maze;
    score: number;
    lives: number;
    level: number;
    modalText?: string;
    paused: boolean;
  }

  export type Loot = {
    position: Point;
    collected: boolean;
  }

  export type Round = {
    dots: Loot[];
    pellets: Loot[];
  }

  export interface Heat {
    pacman: Pacman;
    ghosts: Ghost[];
  }

  export type App = {
    game: Game,
    round: Round,
    heat: Heat
  };

  export function defaultApp(): Store.App {
    const schema = parseMazeSchema(mazeSchema1);
    const cellSize = new Point(28, 28);

    const maze: Maze = {
      cellSize: cellSize,
      passes: schema.passes,
      walls: schema.walls,
      gridSize: schema.gridSize,
      textPos: schema.textCenter,
      gate: schema.gate
    };

    const game: Game = {
      maze: maze,
      paused: false,
      score: 0,
      lives: 3,
      level: 1,
      modalText: undefined
    }

    const dots = schema.dots.sort(Point.YXComparator)
      .map(p => ({ position: p, collected: false }));
    const pellets = schema.pellets.sort(Point.YXComparator)
      .map(p => ({ position: p, collected: false }));

    
    const round: Round = {
      dots: dots,
      pellets: pellets  
    }

    const pacman: Pacman = {
      chomping: false,
      running: false,
      dying: false,
      hidden: false,
      mouthAngle: 90,
      direction: Direction.Left,
      nextDirection: Direction.None,
      position: schema.pacmanInitPos,
      speed: 8 // cells per second
    };

    const ghosts = [0, 1, 2, 3].map(i => {
      return {
        state: GhostState.frozen,
        running: false,
        hidden: false,
        direction: Direction.None,
        speed: 8, // cells per second
        position: schema.ghostInitPos[i]
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