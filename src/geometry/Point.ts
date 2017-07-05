export class Point {
    constructor(public x: number, public y: number) { }

    public offset(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }
}