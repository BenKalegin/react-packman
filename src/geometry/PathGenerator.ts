import Rectangle from './Rectangle';
import Point from './Point';

export default class PathGenerator {
    private static outlineRects(rects: Rectangle[]): Point[] {
        const r1 = rects[0];
        return new Array<Point>(
            new Point (r1.x, r1.y),
            new Point (r1.x, r1.y + r1.dy),
            new Point(r1.x + r1.dx, r1.y + r1.dy),
            new Point (r1.x + r1.dx, r1.y),
            new Point(r1.x, r1.y),
        );
    }


    public static mergeRectangles(rects: Rectangle[]): string {
        const outline = this.outlineRects(rects);
        return outline.reduce((s, p) => s + (s === "" ? "M" : " L ") + p.x + " " + p.y, "");
    }
}