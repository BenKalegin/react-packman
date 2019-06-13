import { Direction, Point } from '../geometry';

export const START_ROUND_ACTION = 'START_ROUND';
export const RELEASE_PACMAN_ACTION = 'ReleasePacman';
export const RELEASE_GHOST_ACTION = 'ReleaseGhost';
export const BRING_GHOST_OUT_ACTION = 'BringHostOut';
export const ANIMATION_STEP_ACTION = 'ANIMATION_STEP';
export const CHANGE_DIRECTION_ACTION = 'CHANGE_DIR';
export const PAUSE_COMMAND_ACTION = 'PAUSE';
export const START_APPLICATION_ACTION = 'StartApp';
export const MODAL_TEXT_ACTION = 'ModalText';
export const DOT_EATEN_ACTION = 'DotEaten';
export const PELLET_EATEN_ACTION = 'PelletEaten';
export const GHOST_BITTEN_ACTION = 'GhostBitten';
export const GHOST_LEFT_BOX_ACTION = 'GhostLeftBox';
export const HEAT_END_ACTION = 'HeatEnd';
export const FREEZE_ACTORS_ACTION = 'FreezeActors';
export const HIDE_ACTORS_ACTION = 'HideActors';
export const KILL_PACMAN_ACTION = 'KillPacman';
export const RESET_HEAT_ACTION = 'ResetHeat';
export const RESET_ROUND_ACTION = 'ResetRound';
export const SHOW_LEVEL_ACTION = 'ShowLevel';
export const INCREASE_LEVEL_ACTION = 'IncreaseLevel';
export const BOUNCE_GHOST_ACTION = 'BounceGhost';
export const START_BLUE_MODE_ACTION = 'StartBlueMode';
export const END_BLUE_MODE_ACTION = 'EndBlueMode';
export const BLUE_MODE_TIMEOVER_ACTION = 'BlueModeTimeOver';

export type StartRoundAction = {
  type: typeof START_ROUND_ACTION;
};

export type AnimatedStepAction = {
  type: typeof ANIMATION_STEP_ACTION;
  timestamp: number;
  /**
   * Milliseconds elapsed since previous animation tick
   */
  period: number;
};

export type ChangeDirectionAction = {
  type: typeof CHANGE_DIRECTION_ACTION;
  direction: Direction;
};

export type PauseCommandAction = {
  type: typeof PAUSE_COMMAND_ACTION;
};

export type StartApplicationAction = {
  type: typeof START_APPLICATION_ACTION;
};

export type ModalTextAction = {
  type: typeof MODAL_TEXT_ACTION;
  text?: string;
};

export type ReleasePacmanAction = {
  type: typeof RELEASE_PACMAN_ACTION;
};

export type ReleaseGhostAction = {
  type: typeof RELEASE_GHOST_ACTION;
  index: number;
};

export type BringGhostOutAction = {
  type: typeof BRING_GHOST_OUT_ACTION;
  index: number;
};

export type BounceGhostAction = {
  type: typeof BOUNCE_GHOST_ACTION;
  index: number;
};

export type DotEatenAction = {
  type: typeof DOT_EATEN_ACTION;
  index: number;
};

export type PelletEatenAction = {
  type: typeof PELLET_EATEN_ACTION;
  index: number;
};

export type GhostBittenAction = {
  type: typeof GHOST_BITTEN_ACTION;
  pacmanPosition: Point;
  ghostIndex: number;
};

export type GhostLeftBoxAction = {
  type: typeof GHOST_LEFT_BOX_ACTION;
  ghostIndex: number;
};

export type HeatEndAction = {
  type: typeof HEAT_END_ACTION;
  lost: boolean;
};

export type FreezeActorsAction = {
  type: typeof FREEZE_ACTORS_ACTION;
};

export type HideActorsAction = {
  type: typeof HIDE_ACTORS_ACTION;
};

export type KillPacmanAction = {
  type: typeof KILL_PACMAN_ACTION;
};

export type ResetHeatAction = {
  type: typeof RESET_HEAT_ACTION;
};

export type ResetRoundAction = {
  type: typeof RESET_ROUND_ACTION;
};

export type ShowLevelAction = {
  type: typeof SHOW_LEVEL_ACTION;
};

export type IncreaseLevelAction = {
  type: typeof INCREASE_LEVEL_ACTION;
};

export type StartBlueModeAction = {
  type: typeof START_BLUE_MODE_ACTION;
};

export type EndBlueModeAction = {
  type: typeof END_BLUE_MODE_ACTION;
};

export type BlueModeTimeOverAction = {
  type: typeof BLUE_MODE_TIMEOVER_ACTION;
};

export function animatedStepAction(timestamp: number, period: number): AnimatedStepAction {
  return {
    type: ANIMATION_STEP_ACTION,
    timestamp: timestamp,
    period: period,
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

export function bringGhostOutAction(index: number): BringGhostOutAction {
  return {
    type: BRING_GHOST_OUT_ACTION,
    index: index
  };
}

export function bounceGhostAction(index: number): BounceGhostAction {
  return {
    type: BOUNCE_GHOST_ACTION,
    index: index
  };
}

export function modalTextAction(text?: string): ModalTextAction {
  return {
    type: MODAL_TEXT_ACTION,
    text: text
  };
}
  
export function dotEatenAction(index: number): DotEatenAction {
    return {
        type: DOT_EATEN_ACTION,
        index: index
    };
}

export function pelletEatenAction(index: number): PelletEatenAction {
    return {
        type: PELLET_EATEN_ACTION,
        index: index
    };
}

export function ghostBittenAction(pacmanPos: Point, ghostIndex: number): GhostBittenAction {
    return {
        type: GHOST_BITTEN_ACTION,
        pacmanPosition: pacmanPos,
        ghostIndex: ghostIndex
    };
}

export function ghostLeftBoxAction(ghostIndex: number): GhostLeftBoxAction {
    return {
        type: GHOST_LEFT_BOX_ACTION,
        ghostIndex: ghostIndex
    };
}

export function heatEndAction(lost: boolean): HeatEndAction {
    return {
        type: HEAT_END_ACTION,
        lost: lost
    };
}

export function freezeActorsAction(): FreezeActorsAction {
    return {
        type: FREEZE_ACTORS_ACTION,
    };
}

export function hideActorsAction(): HideActorsAction {
    return {
        type: HIDE_ACTORS_ACTION,
    };
}

export function killPacmanAction(): KillPacmanAction {
    return {
        type: KILL_PACMAN_ACTION,
    };
}

export function resetHeatAction(): ResetHeatAction {
    return {
        type: RESET_HEAT_ACTION,
    };
}

export function resetRoundAction(): ResetRoundAction {
    return {
        type: RESET_ROUND_ACTION,
    };
}

export function showLevelAction(): ShowLevelAction {
    return {
        type: SHOW_LEVEL_ACTION,
    };
}

export function increaseLevelAction(): IncreaseLevelAction {
    return {
        type: INCREASE_LEVEL_ACTION,
    };
}

export function startBlueModeAction(): StartBlueModeAction {
    return {
        type: START_BLUE_MODE_ACTION,
    };
}

export function endBlueModeAction(): EndBlueModeAction {
    return {
        type: END_BLUE_MODE_ACTION,
    };
}

export function blueModeTimeOverAction(): BlueModeTimeOverAction {
    return {
        type: BLUE_MODE_TIMEOVER_ACTION,
    };
}

export type Action = StartRoundAction |
                     AnimatedStepAction |
                     ChangeDirectionAction |
                     PauseCommandAction |
                     StartApplicationAction |
                     ReleasePacmanAction |
                     ReleaseGhostAction |
                     BounceGhostAction |
                     BringGhostOutAction |
                     ModalTextAction |
                     DotEatenAction | 
                     PelletEatenAction |
                     GhostBittenAction |
                     GhostLeftBoxAction |
                     FreezeActorsAction |
                     HideActorsAction |
                     KillPacmanAction |
                     HeatEndAction |
                     ResetHeatAction |
                     ResetRoundAction |
                     ShowLevelAction | 
                     IncreaseLevelAction |
                     StartBlueModeAction |
                     EndBlueModeAction |
                     BlueModeTimeOverAction;

export interface HasInducedActions {
  asyncDispatch(actions: Action[]): void;
}