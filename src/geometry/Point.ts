import { Rectangle } from '.';

export class Point {
    constructor(public x: number, public y: number) { }

    public offset(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    public manhattanDistanceTo(p: Point): number {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }

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
        }, { x0: bigNumber, y0: bigNumber, x1: -bigNumber, y1: -bigNumber });
        return new Rectangle(edgePoints.x0, edgePoints.y0, edgePoints.x1 - edgePoints.x0, edgePoints.y1 - edgePoints.y0);
    }
}