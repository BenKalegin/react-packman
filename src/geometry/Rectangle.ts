import { Point } from './Point';

export class Rectangle {
    readonly p1: Point;
    readonly p2: Point;

    constructor(x: number, y: number, dx: number, dy: number) {
        this.p1 = new Point(x, y);
        this.p2 = new Point(x + dx, y + dy);
    }

    public get x(): number { return this.p1.x};
    public get y(): number { return this.p1.y};
    public get dx(): number { return this.p2.x - this.p1.x};
    public get dy(): number { return this.p2.y - this.p1.y};

    inflate(delta: number | Point): Rectangle {
      if (typeof (delta) === 'number')
        return new Rectangle(this.x - delta, this.y - delta, this.dx + delta + delta, this.dy + delta + delta);
      return new Rectangle(this.x - delta.x, this.y - delta.y, this.dx + delta.x + delta.x, this.dy + delta.y + delta.y);
    }

    moveBy(delta: Point): Rectangle {
        return new Rectangle(this.x + delta.x, this.y + delta.y, this.dx, this.dy);
    }

  public get center(): Point {
    return new Point(this.x + this.dx /2, this.y + this.dy / 2)
  }
}