import { Point } from "../geometry";

export interface ICollisionDetector {
  tryLoot(pacmanPos: Point, loot: Point[]): boolean;
}

export const createCollisionDetector = (): ICollisionDetector => new CollisionDetector();

const binarySearch = <T>(xs: T[], x: T, cmp: (p: T, q: T) => number): number => {
  var bot = 0;
  var top = xs.length;
  while (bot < top) { // If x is in xs, it's somewhere in xs[bot..top).
    var mid = Math.floor((bot + top) / 2);
    var c = cmp(xs[mid], x);
    if (c === 0) return mid;
    if (c < 0) bot = mid + 1;
    if (0 < c) top = mid;
  }
  return -1;
}


class CollisionDetector implements ICollisionDetector {

  tryLoot(pacmanPos: Point, loot: Point[]): boolean {
    const nearCenter = pacmanPos.round(10).equals(pacmanPos.round(1));
    if (nearCenter) {
      const foundAt = binarySearch(loot, pacmanPos.round(1), Point.YXComparator);
      if (foundAt >= 0) {
        loot.splice(foundAt, 1);
        return true;
      }
    }
    return false;
  }
}

