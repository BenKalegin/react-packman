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

export const PELLET_EATEN_EVENT = "PELLET_EATEN";

export type PelletEatenEvent = {
  type: typeof PELLET_EATEN_EVENT;
  pelletPosition: Point;      

}

export function pelletEatenEvent(PelletPosition: Point): PelletEatenEvent {
  return {
    type: PELLET_EATEN_EVENT,
    pelletPosition: PelletPosition
  }
}

export type GameEvent = DotEatenEvent | PelletEatenEvent;