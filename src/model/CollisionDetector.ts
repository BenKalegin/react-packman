import { Point } from '../geometry';
import { Store } from '.';

export interface ICollisionDetector {
  checkLoot(pacmanPos: Point, loot: Store.Loot[]): number | null;
  checkBite(pacmanPos: Point, ghostPos: Point): boolean;
}

export const createCollisionDetector = (): ICollisionDetector => new CollisionDetector();

const binarySearch = (xs: Store.Loot[], x: Point, cmp: (p: Point, q: Point) => number): number => {
  var bot = 0;
  var top = xs.length;
  while (bot < top) { // If x is in xs, it's somewhere in xs[bot..top).
    var mid = Math.floor((bot + top) / 2);
    var c = cmp(xs[mid].position, x);
    if (c === 0) return mid;
    if (c < 0) bot = mid + 1;
    if (0 < c) top = mid;
  }
  return -1;
}


class CollisionDetector implements ICollisionDetector {


  checkBite(pacmanPos: Point, ghostPos: Point): boolean {
    return pacmanPos.euclidDistanceTo(ghostPos) < 1.6;
  }


  checkLoot(pacmanPos: Point, loot: Store.Loot[]): number | null {
    const nearCenter = pacmanPos.round(5).equals(pacmanPos.round(1));
    if (nearCenter) {
      const foundAt = binarySearch(loot, pacmanPos.round(1), Point.YXComparator);
      if (foundAt >= 0 && !loot[foundAt].collected)
        return foundAt;
    }
    return null;
  }
}

