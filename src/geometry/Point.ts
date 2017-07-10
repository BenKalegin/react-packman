export class Point {
    constructor(public x: number, public y: number) { }

    public offset(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    public manhattanDistanceTo(p: Point): number {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }
}