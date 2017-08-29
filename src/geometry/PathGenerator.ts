import { Point, Direction, rotateDirection } from '.';

export class PathGenerator {

    public static outlinePoints(points: Point[], gridOffset: Point, cellSize: Point): string {
              
      let sparseHash = (point: Point) => point.y * 1000 + point.x;
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
        if (hasPixelOnTheRight(rotateDirection(direction, false))) {
          direction = rotateDirection(direction, false);
          point = point.offset(Point.vector(direction));
        } else if (hasPixelOnTheRight(direction)) {
          point = point.offset(Point.vector(direction));
        } else {
          direction = rotateDirection(direction, true);
          point = point.offset(Point.vector(direction));
        }
        outline.push(point.scale(cellSize).offset(gridOffset));
      } while (!point.equals(startPoint));

      return outline.reduce((s, p) => s + (s === "" ? "M" : " L") + p.x + " " + p.y, "");
    }
}