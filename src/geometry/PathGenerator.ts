import { Point, Direction, rotateDirection } from '.';

export class PathGenerator {

  public static outlinePoints(points: Point[], gridOffset: Point, cellSize: Point): string {

    let sparseHash = (p: Point) => p.y * 1000 + p.x;
    let pixels = new Map<number, boolean>();
    let startPoint: Point = new Point(0, 0);
    let minHash: number = 100000;

    points.forEach(p => {
      const hash = sparseHash(p);
      if (hash < minHash) {
        minHash = hash;
        startPoint = p;
      }
      pixels.set(hash, true);
    });

    let point = startPoint;

    var hasPixelOnTheRight = (dir: Direction) => pixels.get(sparseHash(point.offset(Point.vector(dir))));

    let direction = Direction.Right;

    let outline: Point[] = [];

    do {
      outline.push(point.scale(cellSize).offset(gridOffset).offset(cellSize.scale(0.5)));
      if (hasPixelOnTheRight(rotateDirection(direction, false))) {
        direction = rotateDirection(direction, false);
        point = point.offset(Point.vector(direction));
      } else if (hasPixelOnTheRight(direction)) {
        point = point.offset(Point.vector(direction));
      } else {
        direction = rotateDirection(direction, true);
        point = point.offset(Point.vector(direction));
      }
    } while (!point.equals(startPoint));

    return outline.reduce((acc, p, i, arr) => acc + this.renderPoint(i, arr, 0.4), '');
  }

  private static renderPoint(i: number, outline: Point[], radius: number): string {

    function moveTowardsFractional(movingPoint: Point, targetPoint: Point, fraction: number): Point {
      return movingPoint.offset(targetPoint.offset(movingPoint.negate).scale(fraction));
    }

    const p1 = outline[i];
    const p0 = outline[i === 0 ? outline.length - 1 : i - 1];
    const p2 = (i === outline.length - 1)
      ? outline[0]
      : outline[i + 1];

    let result = '';

    // The start and end of the curve are just our point moved towards the previous and neyt points, respectivly
    let curveStart = moveTowardsFractional(p1, p0, radius);
    let curveEnd = moveTowardsFractional(p1, p2, radius);

    // The curve control points are halfway between the start/end of the curve and the original point
    var startControl = moveTowardsFractional(curveStart, p1, .5);
    var endControl = moveTowardsFractional(p1, curveEnd, .5);

    if ((p0.x === p1.x && p1.x === p2.x) || (p0.y === p1.y && p1.y === p2.y))
      // straight line, no adjustments
      result += `${i === 0 ? 'M' : 'L'}${p1.x} ${p1.y}`;
    else {
      result = `L${curveStart.x} ${curveStart.y} C${startControl.x} ${startControl.y} ${endControl.x} ${endControl.y} ${curveEnd.x} ${curveEnd.y}`;
    }

    if (i === outline.length - 1) {
      const close = moveTowardsFractional(p2, p1, radius);
      result += `L${close.x} ${close.y}`;
    }
    return result;
  }
}