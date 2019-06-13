import { Rectangle, Direction } from '.';

export class Point {
  public static boundingRect(points: Point[]) {
    const bigNumber = 100000;
    const edgePoints = points.reduce((bounds, p) => {
        if (bounds.x0 > p.x)
          bounds.x0 = p.x;
        if (bounds.y0 > p.y)
          bounds.y0 = p.y;
        if (bounds.x1 < p.x)
          bounds.x1 = p.x;
        if (bounds.y1 < p.y)
          bounds.y1 = p.y;
        return bounds;
      },
      { x0: bigNumber, y0: bigNumber, x1: -bigNumber, y1: -bigNumber });
    return new Rectangle(edgePoints.x0, edgePoints.y0, edgePoints.x1 - edgePoints.x0, edgePoints.y1 - edgePoints.y0);
  }

  constructor(public x: number, public y: number) {}

  public offset(by: Point): Point {
    return new Point(this.x + by.x, this.y + by.y);
  }

  public equals(to: Point): boolean {
    return this.x === to.x && this.y === to.y;
  }

  public scale(by: Point | number): Point {
    if (typeof (by) === 'number')
      return new Point(this.x * by, this.y * by);
    return new Point(this.x * by.x, this.y * by.y);
  }

  public manhattanDistanceTo(p: Point): number {
    return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
  }

  public euclidDistanceTo(p: Point): number {
    var dx = p.x - this.x;
    var dy = p.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public asRectangleSize(): Rectangle {
    return new Rectangle(0, 0, this.x, this.y);
  }

  public toRectangle(size: Point): Rectangle {
    return new Rectangle(this.x, this.y, size.x, size.y);
  }

  public toVector(): Point {
    return new Point(Math.sign(this.x), Math.sign(this.y));
  }

  public static vector(towards: Direction): Point {
    switch (towards) {
    case Direction.Right:
      return new Point(1, 0);
    case Direction.Left:
      return new Point(-1, 0);
    case Direction.Up:
      return new Point(0, -1);
    case Direction.Down:
      return new Point(0, 1);
    default:
      return new Point(0, 0);
    }
  }

  public get negate(): Point {
    return new Point(-this.x, -this.y);
  }

  public round(exponent: number): Point {
    function expoRound(value: number) {
      return Math.round(value * exponent) / exponent;
    }
    return new Point(expoRound(this.x), expoRound(this.y));
  }

  public static YXComparator = (p1: Point, p2: Point): number => (p1.y - p2.y) * 1000 + (p1.x - p2.x)
}