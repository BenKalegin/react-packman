import { Point } from '../geometry/Point';

export const DOT_EATEN_EVENT = "DOT_EATEN";
export const GHOST_BITTEN_EVENT = "GHOST_BITTEN";
export const PELLET_EATEN_EVENT = "PELLET_EATEN";
export const ROUND_COMPLETED_EVENT = "ROUND_COMPLETED";

export type DotEatenEvent = {
  type: typeof DOT_EATEN_EVENT;
  index: number;
}

export type PelletEatenEvent = {
  type: typeof PELLET_EATEN_EVENT;
  index: number;
}

export type GhostBittenEvent = {
  type: typeof GHOST_BITTEN_EVENT;
  pacmanPosition: Point;      
  ghostIndex: number;      
}

export type RoundCompletedEvent = {
  type: typeof ROUND_COMPLETED_EVENT;
}

export function dotEatenEvent(index: number): DotEatenEvent {
  return {
    type: DOT_EATEN_EVENT,
    index: index
  }
}

export function pelletEatenEvent(index: number): PelletEatenEvent {
  return {
    type: PELLET_EATEN_EVENT,
    index: index
  }
}

export function ghostBittenEvent(pacmanPos: Point, ghostIndex: number): GhostBittenEvent {
  return {
    type: GHOST_BITTEN_EVENT,
    pacmanPosition: pacmanPos,
    ghostIndex: ghostIndex
  }
}

export function roundCompletedEvent(): RoundCompletedEvent {
  return {
    type: ROUND_COMPLETED_EVENT,
  }
}

export type GameEvent = DotEatenEvent | PelletEatenEvent | GhostBittenEvent | RoundCompletedEvent;