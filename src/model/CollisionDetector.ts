import { Point } from '../geometry';
import { Store } from '.';

export interface ICollisionDetector {
  tryLoot(pacmanPos: Point, loot: Store.Loot[]): boolean;
  tryBite(pacmanPos: Point, ghostPos: Point): boolean;
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


  tryBite(pacmanPos: Point, ghostPos: Point): boolean {
    return pacmanPos.euclidDistanceTo(ghostPos) < 0.9;
  }


  tryLoot(pacmanPos: Point, loot: Store.Loot[]): boolean {
    const nearCenter = pacmanPos.round(5).equals(pacmanPos.round(1));
    if (nearCenter) {
      const foundAt = binarySearch(loot, pacmanPos.round(1), Point.YXComparator);
      if (foundAt >= 0 && !loot[foundAt].collected) {
        loot[foundAt] = { ...loot[foundAt], collected: true };
        return true;
      }
    }
    return false;
  }
}

