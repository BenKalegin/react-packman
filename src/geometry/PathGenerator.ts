import { Rectangle, Point } from '.';

export class PathGenerator {
    private static outlineRects(rects: Rectangle[]): Point[] {
        const r1 = rects[0];
        //const r2 = rects[1];
        return new Array<Point>(
            new Point (r1.x, r1.y),
            new Point (r1.x, r1.y + r1.dy),
            new Point(r1.x + r1.dx, r1.y + r1.dy),
            new Point (r1.x + r1.dx, r1.y),
            new Point(r1.x, r1.y),
        );
    }

    public static pacman(position: Point, radius: number, angle: number) {
        let xStart = position.x + radius * Math.cos(angle);
        let yStart = radius * Math.sin(angle);
        let mouth1 = new Point(xStart, position.y - yStart);
        let mouth2 = new Point(xStart, position.y + yStart);
        
        return `M ${mouth1.x} ${mouth1.y} A ${radius} ${radius}, 0, 1, 0, ${mouth2.x} ${mouth2.y} L ${position.x} ${position.y} Z`;
    }

    public static mergeRectangles(rects: Rectangle[]): string {
        const outline = this.outlineRects(rects);
        return outline.reduce((s, p) => s + (s === "" ? "M" : " L ") + p.x + " " + p.y, "");
    }

    static outlinePoints(points: Point[], gridOffset: Point, cellSize: Point): string {
            
        // remove interim vertical points
        // sort by x then y
        points.sort((p1, p2) => (p1.x - p2.x) * 1000 + (p1.y - p2.y));

        for (let i = 1; i < points.length-1; ) {
            if (points[i].x === points[i - 1].x &&
                points[i].x === points[i + 1].x &&
                points[i].y === points[i - 1].y - 1 &&
                points[i].y === points[i + 1].y + 1)
                points.splice(i, 1);
            else
                i++;
        }

        // remove interim horizontal points
        // sort by y then x
        points.sort((p1, p2) => (p1.y - p2.y) * 1000 + (p1.x - p2.x));

        for (let i = 1; i < points.length-1; ) {
            if (points[i].y === points[i - 1].y &&
                points[i].y === points[i + 1].y &&
                points[i].x === points[i - 1].x - 1 &&
                points[i].x === points[i + 1].x + 1)
                points.splice(i, 1);
            else
                i++;
        }

        let result = "M ";
        return result;
    }
}