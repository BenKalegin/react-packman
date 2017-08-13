export const START_ROUND_ACTION = "START_ROUND";
export const ANIMATION_STEP_ACTION = "ANIMATION_STEP";

export type StartRoundAction = 
{
    type: typeof START_ROUND_ACTION;
} 

export type AnimatedStepAction  = {
    type: typeof ANIMATION_STEP_ACTION;
    tick: number;
}

export function animatedStepAction(tick: number): AnimatedStepAction {
  return {
    type: ANIMATION_STEP_ACTION,
    tick: tick
  };
}

export type Action = StartRoundAction | AnimatedStepAction;