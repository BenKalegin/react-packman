import { Direction } from '../geometry';

export const START_ROUND_ACTION = "START_ROUND";
export const ANIMATION_STEP_ACTION = "ANIMATION_STEP";
export const CHANGE_DIRECTION_ACTION = "CHANGE_DIR";
export const PAUSE_COMMAND_ACTION = "PAUSE";

export type StartRoundAction = 
{
    type: typeof START_ROUND_ACTION;
} 

export type AnimatedStepAction  = {
    type: typeof ANIMATION_STEP_ACTION;
    tick: number;
}

export type ChangeDirectionAction = {
  type: typeof CHANGE_DIRECTION_ACTION;
  direction: Direction;
}

export type PauseCommandAction = {
  type: typeof PAUSE_COMMAND_ACTION;
}


export function animatedStepAction(tick: number): AnimatedStepAction {
  return {
    type: ANIMATION_STEP_ACTION,
    tick: tick
  };
}

export function changeDirectionAction(direction: Direction): ChangeDirectionAction {
  return {
    type: CHANGE_DIRECTION_ACTION,
    direction
  };
}

export function pauseCommandAction(): PauseCommandAction {
  return {
    type: PAUSE_COMMAND_ACTION,
  };
}


export type Action = StartRoundAction | AnimatedStepAction | ChangeDirectionAction | PauseCommandAction;