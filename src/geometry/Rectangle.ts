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

    inflate(delta: number): Rectangle {
        return new Rectangle(this.x - delta, this.y - delta, this.dx + delta + delta, this.dy + delta + delta);
    }
}