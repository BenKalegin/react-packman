import {Point} from '.';

enum Direction {
    None,
    Up,
    Left,
    Down
}

class ProximityIndex {
    private xIndex: number[];
    private yIndex: number[];

    constructor(points: Point[]) {
        // initialize indexes with 1,2,3...
        this.xIndex = new Array(points.length).fill(0).map((v,i) => i);
        this.yIndex = new Array(points.length).fill(0).map((v, i) => i);

        // sort indices
        this.xIndex.sort((i1, i2) => {
            const p1 = points[i1];
            const p2 = points[i2];
            return (p1.x - p2.x) * 1000 + (p1.y - p2.y);
        });

        this.yIndex.sort((i1, i2) => {
            const p1 = points[i1];
            const p2 = points[i2];
            return (p1.y - p2.y) * 1000 + (p1.x - p2.x);
        });
    }

    getTopLeft(): number {
        return this.yIndex[0];
    }

    hasAdjacent(current: number, direction: Direction): number | null {
        if (direction === Direction.Down || direction === Direction.Up) {
            //this.xIndex.indexOf()
        }
        return null;
    }
}
export class LeftHandWalker
{
    /**
     * Sorts points in the figure to make countour line, satrting from top left point and going counter clockwise 
     * @param points
     */
    getBlobOutlinePoints(points: Point[]) {

        // Find the starting point, use top left one

        const index = new ProximityIndex(points);

        let result: Point[] = [];


        const topLeft = index.getTopLeft();
        result.push(points[topLeft]);

        let direction = Direction.Down;
        //if (index.hasAdjacent(direction))
    };
}


