import { Point } from '../geometry/Point';
export const DOT_EATEN_EVENT = "DOT_EATEN";


export type DotEatenEvent = {
  type: typeof DOT_EATEN_EVENT;
  dotPosition: Point;      

}

export function dotEatenEvent(dotPosition: Point): DotEatenEvent {
  return {
    type: DOT_EATEN_EVENT,
    dotPosition: dotPosition
  }
}

export type GameEvent = DotEatenEvent;