import { Point } from '../geometry/Point';

export const DOT_EATEN_EVENT = "DOT_EATEN";
export const GHOST_BITTEN_EVENT = "GHOST_BITTEN";
export const PELLET_EATEN_EVENT = "PELLET_EATEN";

export type DotEatenEvent = {
  type: typeof DOT_EATEN_EVENT;
  dotPosition: Point;      

}

export type GhostBittenEvent = {
  type: typeof GHOST_BITTEN_EVENT;
  pacmanPosition: Point;      
  ghostIndex: number;      
}

export type PelletEatenEvent = {
  type: typeof PELLET_EATEN_EVENT;
  pelletPosition: Point;

}

export function dotEatenEvent(dotPosition: Point): DotEatenEvent {
  return {
    type: DOT_EATEN_EVENT,
    dotPosition: dotPosition
  }
}

export function pelletEatenEvent(pelletPosition: Point): PelletEatenEvent {
  return {
    type: PELLET_EATEN_EVENT,
    pelletPosition: pelletPosition
  }
}

export function ghostBittenEvent(pacmanPos: Point, ghostIndex: number): GhostBittenEvent {
  return {
    type: GHOST_BITTEN_EVENT,
    pacmanPosition: pacmanPos,
    ghostIndex: ghostIndex
  }
}

export type GameEvent = DotEatenEvent | PelletEatenEvent | GhostBittenEvent;