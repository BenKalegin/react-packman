import { Store } from '.';
import { Point } from '../geometry';


const 
  Noscore = " ",
  Dot = "·",
  Gate = "g",
  Fruit = "●",
  Pacman = "P",
  Ghost1 = "1",
  Ghost2 = "2",
  Ghost3 = "3",
  Ghost4 = "4";
// Chars avaialable: ┐│┘└ ║╔╗═╚╝╧╤

export function parseMazeSchema(rows: string[]) {
  const wallSymbols: Map<string, Store.WallType> = new Map([
    ["┌", Store.WallType.nw],
    ["┐", Store.WallType.ne],
    ["─", Store.WallType.n],
    ["│", Store.WallType.w],
    ["└", Store.WallType.sw],
    ["┘", Store.WallType.se],
    ["║", Store.WallType.W],
    ["═", Store.WallType.N],
    ["╔", Store.WallType.NW],
    ["╗", Store.WallType.NE],
    ["╚", Store.WallType.SW],
    ["╝", Store.WallType.SE],
    ["╕", Store.WallType.Ne],
    ["╒", Store.WallType.Nw],
    ["╙", Store.WallType.Ws],
    ["╓", Store.WallType.Wn],
    ["╜", Store.WallType.Es],
    ["╖", Store.WallType.En],
  ]);

  const pellets = new Array<Point>();
  const dots = new Array<Point>();
  const passes = new Array<Store.Pass>();
  const pacman = new Array<Point>();
  let walls: Store.Wall[] = [];
  let ghostInitPos : Point[] = [];

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      let point = new Point(x, y);
      switch (row[x]) {
        case Fruit:
          pellets.push(point);
          passes.push({
            gridPos: point,
            ghostOnly: false
          });
          break;

        case Dot:
          dots.push(point);
          passes.push({
            gridPos: point,
            ghostOnly: false
          });
          break;

        case Pacman:
          pacman.push(point);
          break;

        case Gate:
          passes.push({
            gridPos: point,
            ghostOnly: true
          });
          break;

        case Noscore:
          passes.push({
            gridPos: point,
            ghostOnly: false
          });
          break;



        case Ghost1:
          ghostInitPos[0] = point;
          break;

        case Ghost2:
          ghostInitPos[1] = point;
          break;

        case Ghost3:
          ghostInitPos[2] = point;
          break;

        case Ghost4:
          ghostInitPos[3] = point;
          break;

        default:
          {
            let wall = wallSymbols.get(row[x]);
            const isPassable = (x: number, y: number) => y >= 0 && y < rows.length && x >= 0 && x < rows[0].length && [Dot, Noscore, Fruit].indexOf(rows[y][x]) >= 0;

            if (wall === Store.WallType.N && isPassable(x, y - 1)) {
                wall = Store.WallType.S;
            }
            else if (wall === Store.WallType.W && isPassable(x-1, y)) {
                wall = Store.WallType.E;
            }
            else if (wall === Store.WallType.NW && isPassable(x-1, y)) {
                wall = Store.WallType.NW2;
            }
            else if (wall === Store.WallType.NE && isPassable(x+1, y)) {
                wall = Store.WallType.NE2;
            }
            else if (wall === Store.WallType.SE && isPassable(x+1, y)) {
                wall = Store.WallType.SE2;
            }
            else if (wall === Store.WallType.SW && isPassable(x-1, y)) {
                wall = Store.WallType.SW2;
            }
            if (wall != undefined)
              walls.push({
                position: point,
                type: wall
              });
          }
          break;

      }
    }
  }

  const pacmanInitPos = pacman.reduce((a, c) => a.offset(c), new Point(0, 0))
    .scale(1 / pacman.length);

  const gridSize = new Point(rows[0].length, rows.length);

  return {
      pellets,
      dots,
      passes,
      walls,
      pacmanInitPos,
      ghostInitPos,
      gridSize
  }
}