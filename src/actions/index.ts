import { Direction } from '../geometry';

export const START_ROUND_ACTION = "START_ROUND";
export const RELEASE_PACMAN_ACTION = "ReleasePacman";
export const RELEASE_GHOST_ACTION = "ReleaseGhost";
export const ANIMATION_STEP_ACTION = "ANIMATION_STEP";
export const CHANGE_DIRECTION_ACTION = "CHANGE_DIR";
export const PAUSE_COMMAND_ACTION = "PAUSE";
export const START_APPLICATION_ACTION = "StartApp";
export const INTRO_HEAT_ACTION = "IntroHeat";
export const MODAL_TEXT_ACTION = "ModalText";

export type StartRoundAction = 
{
    type: typeof START_ROUND_ACTION;
} 

export type AnimatedStepAction  = {
    type: typeof ANIMATION_STEP_ACTION;
    timestamp: number;
    period: number;
}

export type ChangeDirectionAction = {
  type: typeof CHANGE_DIRECTION_ACTION;
  direction: Direction;
}

export type PauseCommandAction = {
  type: typeof PAUSE_COMMAND_ACTION;
}

export type StartApplicationAction = {
  type: typeof START_APPLICATION_ACTION;
}

export type ModalTextAction = {
  type: typeof MODAL_TEXT_ACTION;
  text?: string;
}

export type ReleasePacmanAction = {
  type: typeof RELEASE_PACMAN_ACTION;
}

export type ReleaseGhostAction = {
  type: typeof RELEASE_GHOST_ACTION;
  index: number;
}

export type IntroHeatAction = {
  type: typeof INTRO_HEAT_ACTION;
}


export function animatedStepAction(timestamp: number, period: number): AnimatedStepAction {
  return {
    type: ANIMATION_STEP_ACTION,
    timestamp: timestamp,
    period: period
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

export function startApplicationAction(): StartApplicationAction {
  return {
    type: START_APPLICATION_ACTION,
  };
}

export function releasePacmanAction(): ReleasePacmanAction {
  return {
    type: RELEASE_PACMAN_ACTION
  };
}

export function releaseGhostAction(index: number): ReleaseGhostAction {
  return {
    type: RELEASE_GHOST_ACTION,
    index: index
  };
}

export function introHeatAction(): IntroHeatAction {
  return {
    type: INTRO_HEAT_ACTION,
  };
}

export function modalTextAction(text?: string): ModalTextAction {
  return {
    type: MODAL_TEXT_ACTION,
    text: text
  };
}


export type Action = StartRoundAction |
                     AnimatedStepAction |
                     ChangeDirectionAction |
                     PauseCommandAction |
                     StartApplicationAction |
                     ReleasePacmanAction |
                     ReleaseGhostAction |
                     ModalTextAction |
                     IntroHeatAction;