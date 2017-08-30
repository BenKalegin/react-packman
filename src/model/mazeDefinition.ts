import { CellKind, Store } from '.';
import { WallAggregator, Point } from '../geometry';

export const defaultMaze: () => CellKind[][] = () => {
  const _ = CellKind.Impassable;
  const X = CellKind.Score;
  const n = CellKind.Noscore;
  const g = CellKind.Gate;
  const o = CellKind.GhostsOnly;
  const f = CellKind.Fruit;
  const p = CellKind.Pacman;
  return [
    [X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X],
    [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, X],
    [f, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, f],
    [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, X],
    [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X],
    [X, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, X],
    [X, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, X],
    [X, X, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, X, X],
    [_, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, n, n, n, n, n, n, n, n, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, _, _, _, g, g, _, _, _, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, _, o, o, o, o, o, o, _, n, _, _, X, _, _, _, _, _],
    [n, n, n, n, n, X, n, n, n, _, o, o, o, o, o, o, _, n, n, n, X, n, n, n, n, n],
    [_, _, _, _, _, X, _, _, n, _, o, o, o, o, o, o, _, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, _, _, _, _, _, _, _, _, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, n, n, n, p, p, n, n, n, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, _, _, _, _, _, _, _, _, n, _, _, X, _, _, _, _, _],
    [_, _, _, _, _, X, _, _, n, _, _, _, _, _, _, _, _, n, _, _, X, _, _, _, _, _],
    [X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X],
    [X, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, X],
    [f, _, _, _, _, X, _, _, _, _, _, X, _, _, X, _, _, _, _, _, X, _, _, _, _, f],
    [X, X, X, _, _, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, _, _, X, X, X],
    [_, _, X, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, X, _, _],
    [_, _, X, _, _, X, _, _, X, _, _, _, _, _, _, _, _, X, _, _, X, _, _, X, _, _],
    [X, X, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, _, _, X, X, X, X, X, X],
    [X, _, _, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, X],
    [X, _, _, _, _, _, _, _, _, _, _, X, _, _, X, _, _, _, _, _, _, _, _, _, _, X],
    [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X, X]
  ];
};

export function initializeMaze(rows: CellKind[][]) {
  const cells = new Array<Store.Pass>();

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const kind: CellKind = row[cellIndex];
      var cell: Store.Pass = {
        kind: kind,
        gridPos: new Point(cellIndex, rowIndex),
      };
      cells.push(cell);
    }
  }
  const walls: Store.Wall[] = WallAggregator.aggregate(
      cells.filter(c => c.kind === CellKind.Impassable).map(c => { return c.gridPos; }))
    .map(ps => {
      return {
        points: ps
      }
    });

  const passes = cells.filter(c =>
    c.kind === CellKind.GhostsOnly ||
    c.kind === CellKind.Gate ||
    c.kind === CellKind.Score ||
    c.kind === CellKind.Fruit ||
    c.kind === CellKind.Pacman ||
    c.kind === CellKind.Noscore);

  const pacmanCells = cells.filter(c => c.kind === CellKind.Pacman);
  const pacmanInitPos = pacmanCells.reduce((a, c) => a.offset(c.gridPos), new Point(0, 0))
    .scale(new Point(1 / pacmanCells.length, 1 / pacmanCells.length));


  const ghostCells = cells.filter(c => c.kind === CellKind.GhostsOnly);
  const ghostX = Math.min(...ghostCells.map(c => c.gridPos.x));
  const ghostY = Math.min(...ghostCells.map(c => c.gridPos.y));
  const ghostInitPos = [0, 1, 2, 3].map(i => new Point(ghostX + i, ghostY));


    pacmanCells.reduce((a, c) => a.offset(c.gridPos), new Point(0, 0))
    .scale(new Point(1 / pacmanCells.length, 1 / pacmanCells.length));
  return {
    passes,
    walls,
    pacmanInitPos,
    ghostInitPos,
  }
}