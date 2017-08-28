import { Point } from './Point';

export class WallAggregator {
    public static aggregate(cells: Point[]): Point[][] {

        // sort by x+y so we had better chance to have connected neighbours
        var remaining = cells.sort((p1, p2) => { return (p1.x - p2.x) + (p1.y - p2.y)});


        let extractAdjacent = (seed: Point) =>
        {
            let result: Point[] = [];
            let lastDistance = 10000; // large enough for any maze
            for(let i = 0; i < remaining.length; ) {
                const p = remaining[i];
                const distance = p.manhattanDistanceTo(seed);
                if (distance === 1) {
                    result.push(p);
                    remaining.splice(i, 1);
                } else if (distance > lastDistance + 38) {
                    // optimization: we are going away of our point so stop looking. Not sure this is correct.
                    break;
                } else
                    i++;
                lastDistance = distance;
            }        
            return result;
        }

        let appendAdjacentRecursively = (wall: Point[], neighbours: Point[]) => {
            for (let neighbour of neighbours) {
                wall.push(neighbour);
                appendAdjacentRecursively(wall, extractAdjacent(neighbour));
            }
        }

        let walls: Point[][] = [];

        let seed = remaining.shift();
        while(seed != undefined) {
            let wall: Point[] = [];
            appendAdjacentRecursively(wall, [seed]);
            walls.push(wall);
          seed = remaining.shift();
        }

        return walls;

    }    
}